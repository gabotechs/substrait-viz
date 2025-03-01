import React from 'react';
import { Message } from '@bufbuild/protobuf';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';

import { Box } from './components/Box.tsx';
import { Entry } from './components/Entry.tsx';
import { NodeExt, SOURCE_HANDLES } from './compile.ts';
import SmartField from './SmartField.tsx';

type Props = Message & NodeExt & Record<string, unknown>;

function Component({ data }: NodeProps<Node<Props>>) {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Box tag={data.$typeName} node={data}>
        {Object.entries(data).map(([k, v]) => {
          for (const pref of [...data[SOURCE_HANDLES], '$', '__']) {
            if (k.startsWith(pref) || pref.startsWith(k)) return null;
          }
          return (
            <Entry className="my-2" key={k} name={k}>
              <SmartField data={v} />
            </Entry>
          );
        })}
      </Box>
      {data[SOURCE_HANDLES].map((handle, i) => (
        <Handle key={i} type="source" position={Position.Right} id={handle} />
      ))}
    </>
  );
}

export default React.memo(Component);
