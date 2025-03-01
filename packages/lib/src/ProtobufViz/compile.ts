import { Edge, Node } from '@xyflow/react';
import { Message } from '@bufbuild/protobuf';
import { GenMessage } from '@bufbuild/protobuf/codegenv1';

import { castMsg, castMsgArr, castOneOf, castOneOfArr } from './cast.ts';

export interface CompileConfig<G extends GenMessage<Message>> {
  nodes: readonly G[];
  passThrough?: (n: UnderlyingMessage<G>) => UnderlyingMessage<G> | undefined;
}

export const SOURCE_HANDLES = '__source_handles';
export const WIDTH_ATTRIBUTE = '__width';
export const HEIGHT_ATTRIBUTE = '__height';

export type NodeExt = {
  [SOURCE_HANDLES]: string[];
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
    const passThrough = this.cfg.passThrough?.(msg as UnderlyingMessage<G>);
    if (passThrough) return this.compile(passThrough);

    const node = this.newNode(msg);

    const nodes: Node[] = [node];
    const edges: Edge[] = [];

    for (const [sourceHandle, child] of this.children(msg)) {
      const [newNodes, newEdges] = this.compile(child);
      if (newNodes.length > 0) {
        node.data[SOURCE_HANDLES].push(sourceHandle);
        edges.push(link(node, newNodes[0], sourceHandle));
      }
      nodes.push(...newNodes);
      edges.push(...newEdges);
    }

    return [nodes, edges];
  }

  *children(obj: Record<string, unknown>): Generator<[string, N]> {
    for (const [k, v] of Object.entries(obj)) {
      for (const { typeName } of this.cfg.nodes) {
        const node = castMsg<N>(typeName, v);
        if (node) yield [k, node];

        for (const [i, node] of castMsgArr<N>(typeName, v)?.entries() ?? []) {
          yield [`${k} (${i})`, node];
        }

        const oneOf = castOneOf<N>(typeName, v);
        if (oneOf) yield [k, oneOf.value];

        for (const [i, node] of castOneOfArr<N>(typeName, v)?.entries() ?? []) {
          yield [`${k} (${i})`, node.value];
        }
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
    sourceHandle,
  };
}
