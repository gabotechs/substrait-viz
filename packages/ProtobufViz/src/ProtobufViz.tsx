import {
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
import React, { CSSProperties, useLayoutEffect } from 'react';

import { MessageShape, Registry } from '@bufbuild/protobuf';
import {
  CompileConfig,
  Compiler,
  HEIGHT_ATTRIBUTE,
  MessageSchema,
  WIDTH_ATTRIBUTE,
} from './compile.ts';
import { Background } from './components/Background.tsx';
import { Loading } from './components/Loading.tsx';
import { LoadingError } from './components/LoadingError.tsx';
import { CustomEdge } from './CustomEdge.tsx';
import { ProtoFile } from './file.ts';
import { layout } from './layout.ts';
import { loadMessage, loadRegistry } from './load.ts';
import { NodeRenderer, RenderConfig, RenderConfigContext } from './render.ts';
import SmartNode from './SmartNode.tsx';
import './styles.css';
import {
  defaultTheme,
  ProtobufVizTheme,
  ThemeContext,
  useTheme,
} from './theme.ts';

const nodeTypes: Record<string, NodeTypes[string]> = {
  node: SmartNode,
};

const edgeTypes = {
  edge: CustomEdge,
};

export interface ProtobufVizProps<
  S extends MessageSchema = MessageSchema,
  T extends ProtobufVizTheme = ProtobufVizTheme,
> extends CompileConfig<S>,
    RenderConfig<T> {
  className?: string;
  style?: CSSProperties;
  colorMode?: ReactFlowProps['colorMode'];
  schema: S;
  protoMessage: ProtoFile;
  protoDescriptorSets?: ProtoFile[];
  theme?: Partial<T>;
}

export function ProtobufViz<
  S extends MessageSchema,
  T extends ProtobufVizTheme,
>({
  className,
  style,
  colorMode,
  schema,
  protoMessage,
  protoDescriptorSets,
  theme: userTheme,
  // CompileConfig
  coreNodes,
  // RenderConfig
  nodeRender,
  edgesFromFields,
}: ProtobufVizProps<S, T>) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error>();
  const [rootMsg, setRootMsg] = React.useState<MessageShape<S>>();
  const [registry, setRegistry] = React.useState<Registry>();

  React.useEffect(() => {
    async function load() {
      const registry = await loadRegistry(protoDescriptorSets);
      const message = await loadMessage(protoMessage, schema, registry);
      setRootMsg(message);
      setRegistry(registry);
    }

    setLoading(true);
    load()
      .catch(setError)
      .finally(() => setLoading(false));
  }, [protoDescriptorSets, protoMessage, schema]);

  const theme = React.useMemo(
    () => ({ ...defaultTheme, ...userTheme }),
    [userTheme],
  );

  if (loading) return <Loading theme={theme} />;
  if (error) return <LoadingError theme={theme} error={error} />;
  if (!rootMsg) return null;

  return (
    <ThemeContext.Provider value={theme}>
      <RenderConfigContext.Provider
        value={{
          nodeRender: nodeRender as NodeRenderer,
          rootMsg,
          registry,
          edgesFromFields,
        }}
      >
        <ReactFlowProvider>
          <Private
            rootMsg={rootMsg}
            style={style}
            className={className}
            coreNodes={coreNodes}
            colorMode={colorMode}
          />
        </ReactFlowProvider>
      </RenderConfigContext.Provider>
    </ThemeContext.Provider>
  );
}

function Private<S extends MessageSchema>({
  coreNodes,
  rootMsg,
  style,
  className,
  colorMode,
}: CompileConfig<S> & {
  className?: string;
  style?: CSSProperties;
  colorMode?: ReactFlowProps['colorMode'];
  rootMsg: MessageShape<S>;
}) {
  const [layoutReady, setLayoutReady] = React.useState(false);
  const [initNodes, initEdges] = React.useMemo(
    () => Compiler.fromCfg({ coreNodes }).compile(rootMsg),
    [coreNodes, rootMsg],
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

    async function waitForAllNodesPlaced() {
      while (!allNodesPlaced(nodes)) {
        await new Promise(res => setTimeout(res, 10));
      }

      const [n, e] = await layout(nodes, edges);
      setNodes(n);
      setEdges(e);

      // Let some time for the nodes to be placed.
      await new Promise(res => setTimeout(res, 10));
      setLayoutReady(true);
      // await fitView({ duration: 400 });
    }

    void waitForAllNodesPlaced();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = useTheme();

  return (
    <ReactFlow
      colorMode={colorMode}
      style={{ color: theme.textColor, ...style }}
      className={className}
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
        <div
          className="absolute z-10 w-full h-full"
          style={{ background: theme.background }}
        />
      )}
      <Controls />
      <MiniMap bgColor={theme.background} maskColor={theme.boxBackground} />
      <Background theme={theme} />
    </ReactFlow>
  );
}
