import { JsonValue, Message } from '@bufbuild/protobuf';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import React, { memo } from 'react';
import { Box } from './components/Box';
import { Entry } from './components/Entry';
import { Expression } from './gen/substrait/algebra_pb';
import { StringList as StringList } from './components/StringList';
import { printExpression } from './print/printExpression.ts';
import { NodeExt, SOURCE_HANDLES } from './compile.ts';
import { cast, castArr, castStringList } from './cast.ts';

type Props = Message & NodeExt;

function Component({ data }: NodeProps<Node<Props>>) {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Box tag={data.$typeName} node={data}>
        {Object.entries(data).map(([k, v]) => {
          for (const pref of [...data[SOURCE_HANDLES], '$', '__']) {
            if (k.startsWith(pref) || pref.startsWith(k)) return null;
          }

          return <SmartEntry k={k} v={v} />;
        })}
      </Box>
      {data[SOURCE_HANDLES].map((handle, i) => (
        <Handle key={i} type="source" position={Position.Right} id={handle} />
      ))}
    </>
  );
}

function SmartEntry({ k, v }: { k: string; v: unknown }) {
  const entry = (n: React.ReactNode) => <Entry name={k}>{n}</Entry>;

  {
    const n = castStringList(v);
    if (n) return entry(<StringList names={n} />);
  }

  {
    const n = castArr<Expression>('substrait.Expression', v);
    if (n) return entry(<StringList names={n.map(printExpression)} />);
  }

  {
    const n = cast<Expression>('substrait.Expression', v);
    if (n) return entry(printExpression(n));
  }

  return entry(JSON.stringify(trimJsonDepth(v, 2)));
}

function trimJsonDepth(obj: unknown, maxDepth: number, depth = 0): JsonValue {
  if (depth === maxDepth) return '[object]';
  if (typeof obj === 'object' && obj != null) {
    const result: JsonValue = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] =
        typeof v === 'object' ? trimJsonDepth(v, maxDepth, depth + 1) : v;
    }
    return result;
  }

  return obj as JsonValue;
}

export default memo(Component);
