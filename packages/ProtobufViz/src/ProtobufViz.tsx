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
import React, { CSSProperties, type HTMLAttributes } from 'react';

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
import { useSameArray } from './hooks/useSameArray.ts';
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
    RenderConfig<T>,
    Omit<HTMLAttributes<HTMLDivElement>, 'onError'> {
  className?: string;
  style?: CSSProperties;
  colorMode?: ReactFlowProps['colorMode'];
  schema: S;
  protoMessage: ProtoFile;
  protoDescriptorSets?: ProtoFile[] | Registry;
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
  ...divProps
}: ProtobufVizProps<S, T>) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error>();
  const [rootMsg, setRootMsg] = React.useState<MessageShape<S>>();
  const [registry, setRegistry] = React.useState<Registry>();

  React.useEffect(() => {
    async function load() {
      let registry;
      if (protoDescriptorSets == null) {
        registry = await loadRegistry([]);
      } else if (Array.isArray(protoDescriptorSets)) {
        registry = await loadRegistry(protoDescriptorSets);
      } else if (protoDescriptorSets.kind === 'registry') {
        registry = protoDescriptorSets;
      } else {
        throw new Error('invalid protoDescriptorSets passed');
      }
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
            {...divProps}
          />
        </ReactFlowProvider>
      </RenderConfigContext.Provider>
    </ThemeContext.Provider>
  );
}

function Private<S extends MessageSchema>({
  coreNodes: _coreNodes,
  rootMsg,
  style,
  colorMode,
  ...divProps
}: CompileConfig<S> &
  Omit<HTMLAttributes<HTMLDivElement>, 'onError'> & {
    colorMode?: ReactFlowProps['colorMode'];
    rootMsg: MessageShape<S>;
  }) {
  const coreNodes = useSameArray(_coreNodes);
  const [initNodes, initEdges] = React.useMemo(
    () => Compiler.fromCfg({ coreNodes }).compile(rootMsg),
    [coreNodes, rootMsg],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const { fitView } = useReactFlow();
  const ref = React.useRef({ setNodes, setEdges, fitView });
  ref.current = { setNodes, setEdges, fitView };

  // In order to know the dimensions of each node, first, they need
  // to be placed on screen, and the <SmartNode/> component will inject
  // at initialization the clientWidth and client Height of each node.
  // We need to let some time for this to happen.
  const [layoutReady, setLayoutReady] = React.useState(false);
  React.useEffect(() => {
    setLayoutReady(false);
    // Set the nodes so that their height gets calculated behind the scenes.
    ref.current.setNodes(initNodes);
    ref.current.setEdges(initEdges);

    function allNodesPlaced(ns: Node[]): boolean {
      for (const n of ns) {
        if (n.data[WIDTH_ATTRIBUTE] === undefined) return false;
        if (n.data[HEIGHT_ATTRIBUTE] === undefined) return false;
      }
      return true;
    }

    async function waitForAllNodesPlaced() {
      while (!allNodesPlaced(initNodes)) {
        await new Promise(res => setTimeout(res, 10));
      }

      const [n, e] = await layout(initNodes, initEdges);
      ref.current.setNodes(n);
      ref.current.setEdges(e);

      // Let some time for the nodes to be placed.
      await new Promise(res => setTimeout(res, 20));
      setLayoutReady(true);
      await ref.current.fitView();
    }

    void waitForAllNodesPlaced();
  }, [initEdges, initNodes]);

  const theme = useTheme();

  return (
    <ReactFlow
      colorMode={colorMode}
      style={{ color: theme.textColor, ...style }}
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
      {...divProps}
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
