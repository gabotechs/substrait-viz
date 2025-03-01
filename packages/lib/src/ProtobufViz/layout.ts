import { Edge, Node } from '@xyflow/react';
import ELK, { ElkExtendedEdge } from 'elkjs/lib/elk.bundled.js';
import { HEIGHT_ATTRIBUTE, WIDTH_ATTRIBUTE } from './compile.ts';

const elk = new ELK();

const layoutOptions = {
  'elk.direction': 'RIGHT',
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '200',
};

export async function layout(
  nodes: Node[],
  edges: Edge[],
): Promise<[Node[], Edge[]]> {
  const result = await elk.layout({
    id: 'root',
    layoutOptions,
    children: nodes.map(node => ({
      ...node,
      // The Box.tsx component will inject in each node's data this attribute, so
      // it's very imporatant that all the nodes are rendered using custom components
      // wrapped with the Box component, otherwise, the width and height will not be inferred.
      width: Number(node.data[WIDTH_ATTRIBUTE]),
      height: Number(node.data[HEIGHT_ATTRIBUTE]),
    })),
    edges: edges as unknown as ElkExtendedEdge[],
  });

  return [
    result.children?.map(node => ({
      ...node,
      // React Flow expects a position property on the node instead of `x` and `y` fields.
      position: { x: node.x, y: node.y },
    })) as unknown as Node[],
    result.edges as unknown as Edge[],
  ];
}
