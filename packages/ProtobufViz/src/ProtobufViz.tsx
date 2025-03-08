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
import React, { useLayoutEffect } from 'react';

import {
  createFileRegistry,
  FileRegistry,
  fromBinary,
  fromJson,
  MessageShape,
} from '@bufbuild/protobuf';
import { FileDescriptorSetSchema } from '@bufbuild/protobuf/wkt';
import {
  CompileConfig,
  Compiler,
  HEIGHT_ATTRIBUTE,
  MessageSchema,
  WIDTH_ATTRIBUTE,
} from './compile.ts';
import { fetchFile, Json, ProtoFile } from './file.ts';
import { layout } from './layout.ts';
import { RenderConfig, RenderConfigContext } from './render.ts';
import SmartNode from './SmartNode.tsx';
import './styles.css';
import {
  defaultTheme,
  ProtobufVizTheme,
  ThemeContext,
  useTheme,
} from './theme.ts';

const nodeTypes: Record<string, NodeTypes[string]> = {
  node: props => <SmartNode {...props} isNested={false} />,
};

const edgeTypes = {
  bezier: BezierEdge,
};

export interface ProtobufVizProps<S extends MessageSchema>
  extends CompileConfig<S>,
    RenderConfig,
    Pick<ReactFlowProps, 'style' | 'className'> {
  schema: S;
  protoMessage: ProtoFile;
  protoDescriptorSets?: ProtoFile[];
  theme?: Partial<ProtobufVizTheme>;
}

export function ProtobufViz<S extends MessageSchema>(
  props: ProtobufVizProps<S>,
) {
  const { protoDescriptorSets, schema, protoMessage } = props;
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error>();
  const [rootNode, setRootNode] = React.useState<MessageShape<S>>();

  const loadNodes = React.useCallback(async () => {
    let registry;

    if (protoDescriptorSets && protoDescriptorSets.length > 0) {
      registry = createFileRegistry(
        ...(await Promise.all(protoDescriptorSets.map(buildRegistry))),
      );
    }

    const file = await fetchFile(protoMessage);
    if (file instanceof Json) {
      setRootNode(fromJson(schema, file.value, { registry }));
    } else {
      // TODO: how can it be that I'm not able to pass a registry here.
      setRootNode(fromBinary(schema, file));
    }
  }, [protoDescriptorSets, protoMessage, schema]);

  React.useEffect(() => {
    setLoading(true);
    loadNodes()
      .catch(setError)
      .finally(() => setLoading(false));
  }, [loadNodes]);

  const theme = React.useMemo(
    () => ({ ...defaultTheme, ...props.theme }),
    [props.theme],
  );

  if (!rootNode) {
    return (
      <ReactFlow>
        {loading && (
          <div className={'w-full h-full flex items-center justify-center'}>
            Loading...
          </div>
        )}
        {error && (
          <div
            className={
              'w-full h-full text-center p-10 flex items-center justify-center'
            }
          >
            <span className={'text-red-400'}>{error.message}</span>
          </div>
        )}
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
          bgColor={theme.background}
        />
      </ReactFlow>
    );
  }

  return (
    <ThemeContext.Provider value={theme}>
      <RenderConfigContext.Provider value={props}>
        <ReactFlowProvider>
          <Private rootNode={rootNode} {...props} />
        </ReactFlowProvider>
      </RenderConfigContext.Provider>
    </ThemeContext.Provider>
  );
}

function Private<S extends MessageSchema>({
  coreNodes,
  rootNode,
  ...props
}: ProtobufVizProps<S> & { rootNode: MessageShape<S> }) {
  const [layoutReady, setLayoutReady] = React.useState(false);
  const [initNodes, initEdges] = React.useMemo(
    () => Compiler.fromCfg({ coreNodes }).compile(rootNode),
    [coreNodes, rootNode],
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

async function buildRegistry(descriptor: ProtoFile): Promise<FileRegistry> {
  const bin = await fetchFile(descriptor);
  if (bin instanceof Json)
    throw new Error('JSON is not supported for a proto descriptor file');
  const msg = fromBinary(FileDescriptorSetSchema, bin);
  return createFileRegistry(msg);
}
