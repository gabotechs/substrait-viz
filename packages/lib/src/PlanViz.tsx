import { memo } from 'react';
import { NodeProps, Node, Handle, Position } from '@xyflow/react';
import { Plan } from './gen/substrait/plan_pb';
import { Entry } from './components/Entry';
import { Box } from './components/Box';
import { SimpleExtensionDeclarationViz } from './SimpleExtensionDeclarationViz';

function Component({ data }: NodeProps<Node<Plan>>) {
  const {
    majorNumber = '?',
    minorNumber = '?',
    patchNumber = '?',
  } = data.version ?? {};

  return (
    <>
      <Box tag={data.$typeName} node={data}>
        <Entry name="version">
          {`${majorNumber}.${minorNumber}.${patchNumber}`}
        </Entry>
        <Entry name="extensions">
          {data.extensions.map((ext, i) => (
            <SimpleExtensionDeclarationViz key={i} ext={ext} />
          ))}
        </Entry>
        <Entry name="extension uris">
          {data.extensionUris.map((extUri, i) => (
            <span key={i}>
              (*{extUri.extensionUriAnchor}) {extUri.uri}
            </span>
          ))}
        </Entry>
      </Box>
      {data.relations.map((_, i) => (
        <Handle
          key={i}
          id={i.toString()}
          type="source"
          position={Position.Right}
        />
      ))}
    </>
  );
}

export default memo(Component);
