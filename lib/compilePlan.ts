import { Edge, Node } from '@xyflow/react';
import { Plan, PlanRel } from './gen/substrait/plan_pb';
import { Rel } from './gen/substrait/algebra_pb';

export type NodeType =
  | 'plan'
  | 'root'
  | Exclude<Rel['relType']['case'], undefined>;

export const compilePlan: CompileFn<Plan> = (node, ctx) => {
  const nodes: Node[] = [ctx.newNode('plan', node)];
  const edges: Edge[] = [];

  ctx = ctx.addIdx(1).addX(1);

  let i = 0;
  for (const planRel of node.relations) {
    const [newNodes, newEdges] = compilePlanRel(planRel, ctx.addIdx(i).addY(i));
    if (newNodes.length > 0) {
      edges.push(link(nodes[0], newNodes[0], i));
    }
    nodes.push(...newNodes);
    edges.push(...newEdges);
    i++;
  }

  return [nodes, edges];
};

export const compilePlanRel: CompileFn<PlanRel> = (node, ctx) => {
  switch (node.relType.case) {
    case 'rel':
      return compileRel(node.relType.value, ctx);
    case 'root':
      return compileRelType(node.relType, ctx, oneInput);
    case undefined:
      return [[], []];
  }
};

export const compileRel: CompileFn<Rel> = (node, ctx) => {
  switch (node.relType.case) {
    case 'read':
      return compileRelType(node.relType, ctx, noInputs);
    case 'filter':
      return compileRelType(node.relType, ctx, oneInput);
    case 'fetch':
      return compileRelType(node.relType, ctx, oneInput);
    case 'aggregate':
      return compileRelType(node.relType, ctx, oneInput);
    case 'sort':
      return compileRelType(node.relType, ctx, oneInput);
    case 'join':
      return compileRelType(node.relType, ctx, lrInputs);
    case 'project':
      return compileRelType(node.relType, ctx, oneInput);
    case 'set':
      return compileRelType(node.relType, ctx, multipleInputs);
    case 'extensionSingle':
      return compileRelType(node.relType, ctx, oneInput);
    case 'extensionMulti':
      return compileRelType(node.relType, ctx, multipleInputs);
    case 'extensionLeaf':
      return compileRelType(node.relType, ctx, noInputs);
    case 'cross':
      return compileRelType(node.relType, ctx, lrInputs);
    case 'reference':
      return compileRelType(node.relType, ctx, noInputs);
    case 'write':
      return compileRelType(node.relType, ctx, oneInput);
    case 'ddl':
      return compileRelType(node.relType, ctx, n => ({
        viewDefinition: n.viewDefinition,
      }));
    case 'window':
      return compileRelType(node.relType, ctx, oneInput);
    case 'expand':
      return compileRelType(node.relType, ctx, oneInput);
    case 'hashJoin':
      return compileRelType(node.relType, ctx, lrInputs);
    case 'exchange':
      return compileRelType(node.relType, ctx, oneInput);
    case 'mergeJoin':
      return compileRelType(node.relType, ctx, lrInputs);
    case 'nestedLoopJoin':
      return compileRelType(node.relType, ctx, lrInputs);
    case undefined:
      return [[], []];
  }
};

function compileRelType<N extends Record<string, unknown>>(
  relType: { case: NodeType; value: N },
  ctx: CompileContext,
  inputs: (node: N) => Record<string, Rel | undefined>,
): [Node[], Edge[]] {
  if (relType.case == undefined) return [[], []];

  const nodes: Node[] = [ctx.newNode(relType.case, relType.value)];
  const edges: Edge[] = [];

  ctx = ctx.addIdx(1).addX(1);

  let i = 0;
  for (const [sourceHandle, rel] of Object.entries(inputs(relType.value))) {
    if (rel === undefined) continue;
    const [newNodes, newEdges] = compileRel(rel, ctx.addIdx(i).addY(i));
    if (newNodes.length > 0) {
      edges.push(link(nodes[0], newNodes[0], sourceHandle));
    }
    nodes.push(...newNodes);
    edges.push(...newEdges);
    i++;
  }

  return [nodes, edges];
}

const noInputs = () => ({});

const oneInput = ({ input }: { input?: Rel }) => ({ input });

const lrInputs = ({ left, right }: { left?: Rel; right?: Rel }) => ({
  left,
  right,
});

const multipleInputs = ({ inputs }: { inputs: Array<Rel | undefined> }) =>
  inputs.reduce(
    (acc, v, i) => {
      acc[i] = v;
      return acc;
    },
    {} as Record<number, Rel | undefined>,
  );

type CompileFn<T> = (node: T, ctx: CompileContext) => [Node[], Edge[]];

function link(from: Node, to: Node, sourceHandle?: string | number): Edge {
  return {
    id: `${from.id}-${to.id}`,
    source: from.id,
    target: to.id,
    type: 'bezier',
    label: sourceHandle,
    sourceHandle: sourceHandle?.toString(),
  };
}

export interface CompileConfig {
  xDelta: number;
  yDelta: number;
}

export class CompileContext {
  constructor(
    readonly config: CompileConfig,
    readonly idx = 0,
    readonly x = 0,
    readonly y = 0,
  ) {}

  addIdx(idx: number) {
    return new CompileContext(this.config, this.idx + idx, this.x, this.y);
  }

  addX(x: number) {
    return new CompileContext(
      this.config,
      this.idx,
      this.x + x * this.config.xDelta,
      this.y,
    );
  }

  addY(y: number) {
    return new CompileContext(
      this.config,
      this.idx,
      this.x,
      this.y + y * this.config.yDelta,
    );
  }

  newNode<T extends Record<string, unknown>>(type: NodeType, data: T): Node<T> {
    return {
      id: this.idx.toString(),
      position: { x: this.x, y: this.y },
      data,
      type,
    };
  }
}
