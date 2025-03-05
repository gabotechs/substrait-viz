import React, { useLayoutEffect } from 'react';
import {
  Background,
  BackgroundVariant,
  BezierEdge,
  Controls,
  MiniMap,
  Node,
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
import { GenMessage } from '@bufbuild/protobuf/codegenv1';

import './styles.css';
import {
  CompileConfig,
  Compiler,
  HEIGHT_ATTRIBUTE,
  UnderlyingMessage,
  WIDTH_ATTRIBUTE,
} from './compile.ts';
import { layout } from './layout.ts';
import { RenderConfig, RenderConfigContext } from './render.ts';
import {
  defaultTheme,
  ProtobufVizTheme,
  ThemeContext,
  useTheme,
} from './theme.ts';
import SmartNode from './SmartNode.tsx';

const nodeTypes: Record<string, NodeTypes[string]> = {
  node: props => <SmartNode {...props} isNested={false} />,
};

const edgeTypes = {
  bezier: BezierEdge,
};

type Extra = Pick<ReactFlowProps, 'style' | 'className'>;

export interface ProtobufVizProps<G extends GenMessage<Message>> extends Extra {
  config: CompileConfig<G>;
  rootNode: UnderlyingMessage<G>;
  render?: RenderConfig;
  theme?: Partial<ProtobufVizTheme>;
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

  // In order to know the dimensions of each node, first, they need
  // to be placed on screen, and the <SmartNode/> component will inject
  // at initialization the clientWidth and client Height of each node.
  // We need to let some time for this to happen.
  useLayoutEffect(() => {
    function allNodesPlaced(ns: Node[]): boolean {
      for (const n of ns) {
        if (n.data[WIDTH_ATTRIBUTE] === undefined) return false;
        if (n.data[HEIGHT_ATTRIBUTE] === undefined) return false;
      }
      return true;
    }

    (async function f() {
      while (!allNodesPlaced(nodes)) {
        await new Promise(res => setTimeout(res, 10));
      }

      const [n, e] = await layout(nodes, edges);
      setNodes(n);
      setEdges(e);

      // Let some time for the nodes to be placed.
      await new Promise(res => setTimeout(res, 10));
      setLayoutReady(true);
      await fitView({ duration: 400 });
    })();
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
      zoomOnDoubleClick={false}
      onPaneClick={() => fitView({ duration: 400 })}
      onNodeDoubleClick={async (_, n) => {
        await fitView({ nodes: [n], duration: 400 });
      }}
      minZoom={0.1}
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
  const theme = React.useMemo(
    () => ({ ...defaultTheme, ...props.theme }),
    [props.theme],
  );

  return (
    <ThemeContext.Provider value={theme}>
      <RenderConfigContext.Provider value={props.render ?? {}}>
        <ReactFlowProvider>
          <Private {...props} />
        </ReactFlowProvider>
      </RenderConfigContext.Provider>
    </ThemeContext.Provider>
  );
}
