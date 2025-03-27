import { Message } from '@bufbuild/protobuf';
import { GenMessage } from '@bufbuild/protobuf/codegenv1';
import { Edge, Node } from '@xyflow/react';

import { castAnyMsg, castMsg } from './cast.ts';

export type MessageSchema<M extends Message = Message> = Omit<
  GenMessage<M>,
  'v' | 'a' | 'b'
>;

export interface CompileConfig<S extends MessageSchema> {
  coreNodes?: readonly S[];
}

export const CORE_NODE = '__core_node';
export const HANDLE = '__handle';
export const WIDTH_ATTRIBUTE = '__width';
export const HEIGHT_ATTRIBUTE = '__height';

export type NodeExt = {
  [CORE_NODE]?: boolean;
  [HANDLE]?: { id: string; label: string };
  [WIDTH_ATTRIBUTE]?: number;
  [HEIGHT_ATTRIBUTE]?: number;
};

export type UnderlyingMessage<S extends MessageSchema> =
  S extends MessageSchema<infer N> ? N : never;

export class Compiler<N extends Message, S extends MessageSchema<N>> {
  protected constructor(
    readonly cfg: CompileConfig<S>,
    readonly idx = { ref: 0 },
  ) {}

  static fromCfg<N extends Message, S extends MessageSchema<N>>(
    cfg: CompileConfig<S>,
  ): Compiler<N, S> {
    return new Compiler(cfg);
  }

  newNode(data: N): Node<N & NodeExt> {
    return {
      position: { x: 0, y: 0 },
      id: (++this.idx.ref).toString(),
      data,
      type: 'node',
    };
  }

  compile(msg: N): [Node[], Edge[]] {
    const node = this.newNode(msg);

    const nodes: Node[] = [node];
    const edges: Edge[] = [];

    // It's possible that there's multiple source handles with the same name,
    // so in order to not incur into collisions, track the names ensuring
    // that any source handle name that we emit is unique.
    for (const [sourceHandle, child] of this.children(msg)) {
      const [newNodes, newEdges] = this.compile(child);
      if (newNodes.length > 0) {
        edges.push(link(node, newNodes[0], sourceHandle));
      }
      nodes.push(...newNodes);
      edges.push(...newEdges);
    }

    return [nodes, edges];
  }

  *children(
    obj: unknown,
    parent?: Message & NodeExt,
    key?: string,
    uniqueNameTracker = new UniqueNameTracker(),
  ): Generator<[string, N]> {
    const msg = castAnyMsg(obj);
    if (msg && parent !== undefined && key !== undefined) {
      for (const { typeName } of this.cfg.coreNodes ?? []) {
        const node = castMsg<N & NodeExt>(typeName, msg);
        if (node) {
          const uniqueKey = uniqueNameTracker.getUnique(key);
          node[HANDLE] = { id: uniqueKey, label: node.$typeName };
          return yield [uniqueKey, node];
        }
      }
    }
    if (msg) {
      parent = msg;
    }

    if (Array.isArray(obj)) {
      for (const [i, el] of obj.entries()) {
        yield* this.children(el, parent, `${key}[${i}]`, uniqueNameTracker);
      }
      return;
    }

    if (typeof obj === 'object' && obj != null) {
      for (const [k, v] of Object.entries(obj)) {
        yield* this.children(v, parent, k, uniqueNameTracker);
      }
      return;
    }
  }
}

function link(from: Node, to: Node, sourceHandle: string): Edge {
  return {
    id: `${from.id}-${to.id}`,
    source: from.id,
    target: to.id,
    type: 'edge',
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
