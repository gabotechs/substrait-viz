import React, { useLayoutEffect } from 'react';
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  NodeTypes,
  ReactFlow,
  useEdgesState,
  useNodesState,
  BezierEdge,
  useReactFlow,
  ReactFlowProvider,
  ReactFlowProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { fromJson } from '@bufbuild/protobuf';

import { PlanSchema } from './gen/substrait/plan_pb';
import { ThemeProvider } from './theme/ThemeProvider';
import { SubstraitVizTheme } from './theme/SubstraitVizTheme';
import { Compiler } from './compile.ts';
import { getLayoutedElements } from './autoLayout';
import { useTheme } from './theme/useTheme';
import { CONFIG } from './config.ts';
import SmartNode from './SmartNode.tsx';

import './styles.css';

const nodeTypes: Record<string, NodeTypes[string]> = {
  node: SmartNode,
};

const edgeTypes = {
  bezier: BezierEdge,
};

export interface SubstraitVizProps
  extends Pick<ReactFlowProps, 'style' | 'className'> {
  plan: string;
  theme?: SubstraitVizTheme;
}

function SubstraitVizPrivate({ plan, ...props }: SubstraitVizProps) {
  const [layoutReady, setLayoutReady] = React.useState(false);
  const [initNodes, initEdges] = React.useMemo(
    () =>
      Compiler.fromCfg(CONFIG).compile(fromJson(PlanSchema, JSON.parse(plan))),
    [plan],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const { fitView } = useReactFlow();

  const onLayout = React.useCallback(() => {
    getLayoutedElements(nodes, edges).then(([nodes, edges]) => {
      if (nodes.length > 0 && edges.length > 0) {
        setNodes(nodes);
        setEdges(edges);
      }

      window.requestAnimationFrame(async () => {
        await fitView();
        setLayoutReady(true);
      });
    });
  }, [nodes, edges, setNodes, setEdges, fitView]);

  useLayoutEffect(() => {
    // Dirty trick to allow all the nodes to be placed so that they can be layed out appropriately.
    setTimeout(() => onLayout(), 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { background } = useTheme();

  return (
    <ReactFlow
      {...props}
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      {!layoutReady && (
        <div className="absolute z-10 w-full h-full" style={{ background }} />
      )}
      <Controls />
      <MiniMap />
      <Background
        variant={BackgroundVariant.Dots}
        gap={12}
        size={1}
        bgColor={background}
      />
    </ReactFlow>
  );
}

export function SubstraitViz(props: SubstraitVizProps) {
  return (
    <ThemeProvider theme={props.theme}>
      <ReactFlowProvider>
        <SubstraitVizPrivate {...props} />
      </ReactFlowProvider>
    </ThemeProvider>
  );
}
