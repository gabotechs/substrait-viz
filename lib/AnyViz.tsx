import { JsonValue } from '@bufbuild/protobuf';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import React, { memo } from 'react';
import { Box, HEIGHT_ATTRIBUTE, WIDTH_ATTRIBUTE } from './components/Box';
import { Entry } from './components/Entry';
import { RelCommonViz } from './components/RelCommonViz';
import {
  AggregateRel_Grouping,
  Expression,
  RelCommon,
} from './gen/substrait/algebra_pb';
import { StringList as StringList } from './components/StringList';
import { GroupingViz } from './components/GroupingViz';
import { serializeExpression } from './components/serializeExpression';

type Props = { $typeName: string } & Record<string, unknown>;

function Component({ data }: NodeProps<Node<Props>>) {
  const handles = React.useMemo(() => getHandles(data), [data]);
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Box tag={data.$typeName} node={data}>
        {Object.entries(data).map(([k, v]) => {
          if (
            handles.includes(k) ||
            ['$typeName', WIDTH_ATTRIBUTE, HEIGHT_ATTRIBUTE].includes(k)
          ) {
            return null;
          }

          return <SmartEntry k={k} v={v} />;
        })}
      </Box>
      {handles.map((handle, i) => (
        <Handle key={i} type="source" position={Position.Right} id={handle} />
      ))}
    </>
  );
}

function SmartEntry({ k, v }: { k: string; v: unknown }) {
  const entry = (n: React.ReactNode) => <Entry name={k}>{n}</Entry>;

  {
    const n = parseStringList(v);
    if (n) return entry(<StringList names={n} />);
  }

  {
    const n = parseObj<Expression>(v, 'substrait.Expression');
    if (n) return entry(serializeExpression(n));
  }

  {
    const n = parseObj<RelCommon>(v, 'substrait.RelCommon');
    if (n) return entry(<RelCommonViz key={k} relCommon={n} />);
  }

  {
    // prettier-ignore
    const n = parseObjArray<AggregateRel_Grouping>( v, 'substrait.AggregateRel.Grouping');
    if (n) return entry(n.map((g, i) => <GroupingViz key={i} grouping={g} />));
  }

  {
    const n = parseObjArray<Expression>(v, 'substrait.Expression');
    if (n) return entry(<StringList names={n.map(serializeExpression)} />);
  }

  return entry(JSON.stringify(trimJsonDepth(v, 2)));
}

function parseStringList(obj: unknown): string[] | undefined {
  if (Array.isArray(obj)) {
    if (obj.length === 0) return obj;
    if (typeof obj[0] === 'string') return obj;
  }
  return undefined;
}

function parseObjArray<T>(obj: unknown, typeName: string): T[] | undefined {
  if (Array.isArray(obj) && obj.length > 0 && parseObj(obj[0], typeName)) {
    return obj as T[];
  }
  return undefined;
}

function parseObj<T>(obj: unknown, typeName: string): T | undefined {
  if (
    typeof obj === 'object' &&
    !Array.isArray(obj) &&
    obj != null &&
    '$typeName' in obj &&
    obj.$typeName === typeName
  ) {
    return obj as T;
  }
  return undefined;
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

function getHandles(obj: object): string[] {
  const handles: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    if (k === 'input') handles.push(k);
    if (k === 'left') handles.push(k);
    if (k === 'right') handles.push(k);
    if (k === 'inputs') {
      for (const i in v) {
        handles.push(i.toString());
      }
    }
  }
  return handles;
}

export default memo(Component);
