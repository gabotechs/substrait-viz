import React, { useLayoutEffect } from 'react';
import {
  Background,
  BackgroundVariant,
  BezierEdge,
  Controls,
  MiniMap,
  NodeTypes,
  ReactFlow,
  ReactFlowProps,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Message } from '@bufbuild/protobuf';

import { ThemeProvider } from './theme/ThemeProvider.tsx';
import { ProtobufVizTheme } from './theme/ProtobufVizTheme.ts';
import { useTheme } from './theme/useTheme.ts';
import { CompileConfig, Compiler, UnderlyingMessage } from './compile.ts';
import { layout } from './layout.ts';
import SmartNode from './SmartNode.tsx';
import { GenMessage } from '@bufbuild/protobuf/codegenv1';

const nodeTypes: Record<string, NodeTypes[string]> = {
  node: SmartNode,
};

const edgeTypes = {
  bezier: BezierEdge,
};

type Extra = Pick<ReactFlowProps, 'style' | 'className'>;

export interface ProtobufVizProps<G extends GenMessage<Message>> extends Extra {
  config: CompileConfig<G>;
  rootNode: UnderlyingMessage<G>;
  theme?: ProtobufVizTheme;
}

function Private<G extends GenMessage<Message>>({
  config,
  rootNode,
  ...props
}: ProtobufVizProps<G>) {
  const [layoutReady, setLayoutReady] = React.useState(false);
  const [initNodes, initEdges] = React.useMemo(
    () => Compiler.fromCfg(config).compile(rootNode),
    [config, rootNode],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const { fitView } = useReactFlow();

  const onLayout = React.useCallback(() => {
    layout(nodes, edges).then(([nodes, edges]) => {
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

export function ProtobufViz<G extends GenMessage<Message>>(
  props: ProtobufVizProps<G>,
) {
  return (
    <ThemeProvider theme={props.theme}>
      <ReactFlowProvider>
        <Private {...props} />
      </ReactFlowProvider>
    </ThemeProvider>
  );
}
