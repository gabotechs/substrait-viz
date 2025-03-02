import { Edge, Node } from '@xyflow/react';
import { Message } from '@bufbuild/protobuf';
import { GenMessage } from '@bufbuild/protobuf/codegenv1';

import { castMsg, castMsgArr, castOneOf, castOneOfArr } from './cast.ts';

export interface CompileConfig<G extends GenMessage<Message>> {
  nodes: readonly G[];
  passThrough?: (n: UnderlyingMessage<G>) => UnderlyingMessage<G> | undefined;
}

export const SOURCE_HANDLES = '__source_handles';
export const TARGET_HANDLE = '__target_handle';
export const WIDTH_ATTRIBUTE = '__width';
export const HEIGHT_ATTRIBUTE = '__height';

export type NodeExt = {
  [SOURCE_HANDLES]: string[];
  [TARGET_HANDLE]: string;
  [WIDTH_ATTRIBUTE]?: number;
  [HEIGHT_ATTRIBUTE]?: number;
};

export type UnderlyingMessage<G extends GenMessage<Message>> =
  G extends GenMessage<infer N> ? N : never;

export class Compiler<N extends Message, G extends GenMessage<N>> {
  protected constructor(
    readonly cfg: CompileConfig<G>,
    readonly idx = { ref: 0 },
  ) {}

  static fromCfg<N extends Message, G extends GenMessage<N>>(
    cfg: CompileConfig<G>,
  ): Compiler<N, G> {
    return new Compiler(cfg);
  }

  newNode(data: N): Node<N & NodeExt> {
    const dataWithSourceHandles = data as N & NodeExt;
    dataWithSourceHandles[SOURCE_HANDLES] = [];
    return {
      position: { x: 0, y: 0 },
      id: (++this.idx.ref).toString(),
      data: dataWithSourceHandles,
      type: 'node',
    };
  }

  compile(msg: N): [Node[], Edge[]] {
    // If the user said that this node needs to be passed through, then
    // do not add it as a node and keep compiling.
    const passThrough = this.cfg.passThrough?.(msg as UnderlyingMessage<G>);
    if (passThrough) return this.compile(passThrough);

    const node = this.newNode(msg);

    const nodes: Node[] = [node];
    const edges: Edge[] = [];

    // It's possible that there's multiple source handles with the same name,
    // so in order to not incur into collisions, track the names ensuring
    // that any source handle name that we emit is unique.
    const uniqueNameTracker = new UniqueNameTracker();
    for (const [sourceHandle, child] of this.children(msg)) {
      const [newNodes, newEdges] = this.compile(child);
      if (newNodes.length > 0) {
        const handleName = uniqueNameTracker.getUnique(sourceHandle);
        node.data[SOURCE_HANDLES].push(handleName);
        newNodes[0].data[TARGET_HANDLE] = handleName;
        edges.push(link(node, newNodes[0], handleName));
      }
      nodes.push(...newNodes);
      edges.push(...newEdges);
    }

    return [nodes, edges];
  }

  *children(obj: Record<string, unknown>): Generator<[string, N]> {
    for (const [k, v] of Object.entries(obj)) {
      // Keep track if we emitted a child node. we need this because if we
      // don't, we need to deeply descend in the JS object looking children.
      let didYield = false;

      // Gather children nodes present in the current value if:
      // - the value is a protobuf message, and the message $typeName
      //   belongs to one of the configured core nodes
      // - the value is an array of protobuf messages, and the messages $typeName
      //   belongs to one of the configured core nodes
      // - the value is a oneOf protobuf entry, and the value part is a
      //   protobuf message with its $typeName belonging to one of the
      //   configured core nodes
      // - the value is an array of oneOf entries, and each entry's value is a
      //   protobuf message with its $typeName belonging to one of the
      //   configured core nodes
      for (const { typeName } of this.cfg.nodes) {
        const node = castMsg<N>(typeName, v);
        if (node) {
          yield [k, node];
          didYield = true;
          break;
        }

        for (const [i, node] of castMsgArr<N>(typeName, v)?.entries() ?? []) {
          yield [`${k} (${i})`, node];
          didYield = true;
        }

        const oneOf = castOneOf<N>(typeName, v);
        if (oneOf) {
          yield [k, oneOf.value];
          didYield = true;
        }

        for (const [i, node] of castOneOfArr<N>(typeName, v)?.entries() ?? []) {
          yield [`${k} (${i})`, node.value];
          didYield = true;
        }

        if (didYield) break;
      }

      if (!didYield && typeof v === 'object' && v != null) {
        // Could not find any children in the current value, but maybe,
        // if we deeply descent into the JS object, we find some deeply
        // nested children.
        yield* this.children(v as Record<string, unknown>);
      }
    }
  }
}

function link(from: Node, to: Node, sourceHandle: string): Edge {
  return {
    id: `${from.id}-${to.id}`,
    source: from.id,
    target: to.id,
    type: 'bezier',
    label: sourceHandle,
    // We want edges to always be rendered on top
    zIndex: 99999,
    sourceHandle,
  };
}

class UniqueNameTracker {
  private tracker: Record<string, number> = {};

  getUnique(name: string): string {
    this.tracker[name] ??= 0;
    this.tracker[name] += 1;
    if (this.tracker[name] > 1) {
      return name + "'".repeat(this.tracker[name] - 1);
    } else {
      return name;
    }
  }
}
