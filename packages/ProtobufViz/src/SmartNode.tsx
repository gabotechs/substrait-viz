import { fromBinary, JsonValue, Message } from '@bufbuild/protobuf';
import React from 'react';

import { Any, AnySchema } from '@bufbuild/protobuf/wkt';
import { Handle, Position } from '@xyflow/react';
import {
  castAnyMsg,
  castAnyMsgArr,
  castAnyOneOf,
  castAnyOneOfArr,
  castNumber,
  castNumberList,
  castString,
  castStringList,
  castUint8Array,
} from './cast.ts';
import {
  HANDLE,
  HEIGHT_ATTRIBUTE,
  NodeExt,
  WIDTH_ATTRIBUTE,
} from './compile.ts';
import { Binary } from './components/Binary.tsx';
import { Box } from './components/Box.tsx';
import { Entry } from './components/Entry.tsx';
import { NumberList } from './components/NumberList.tsx';
import { StringList } from './components/StringList.tsx';
import { useRenderConfig } from './render.ts';
import { stringify } from './stringify.ts';
import { useTheme } from './theme.ts';

interface SmartNodeProps {
  data: unknown;
  isNested: boolean;
}

function SmartNode({ data, isNested }: SmartNodeProps) {
  {
    const n = castStringList(data);
    if (n) return <StringList entries={n} />;
  }

  {
    const n = castUint8Array(data);
    if (n) return <Binary data={n} />;
  }

  {
    const n = castString(data);
    if (n) return n;
  }

  {
    const n = castNumberList(data);
    if (n) return <NumberList entries={n} />;
  }

  {
    const n = castNumber(data);
    if (n) return n;
  }

  {
    const n = castAnyMsg(data);
    if (n) return <Msg msg={n} isNested={isNested} />;
  }

  {
    const n = castAnyOneOf(data);
    if (n) return <Msg msg={n.value} isNested={isNested} />;
  }

  {
    const n = castAnyMsgArr(data);
    if (n)
      return (
        <div className="flex flex-col gap-2">
          {n.map((v, i) => (
            <Msg key={i} msg={v} isNested={isNested} />
          ))}
        </div>
      );
  }

  {
    const n = castAnyOneOfArr(data);
    if (n)
      return (
        <div className="flex flex-col gap-2">
          {n.map((v, i) => (
            <Msg key={i} msg={v.value} isNested={isNested} />
          ))}
        </div>
      );
  }

  return stringify(trimJsonDepth(data, 2));
}

function Msg({ msg, isNested }: { msg: Message & NodeExt; isNested: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { nodeRender, edgesFromFields, registry } = useRenderConfig();
  const theme = useTheme();

  msg = React.useMemo(() => {
    if (msg.$typeName === AnySchema.typeName) {
      const anyMsg = msg as Any;
      const desc = registry?.getMessage(anyMsg.typeUrl);
      if (!desc) return msg;
      return fromBinary(desc, anyMsg.value);
    }
    return msg;
  }, [msg, registry]);

  React.useLayoutEffect(() => {
    if (ref.current && !isNested) {
      // This will inject the __height and __width attributes into the React Flow
      // nodes so that the autolayout function can know about the dimensions of
      // each node.
      msg[WIDTH_ATTRIBUTE] = ref.current.clientWidth;
      msg[HEIGHT_ATTRIBUTE] = ref.current.clientHeight;
    }
  }, [isNested, msg]);

  if (msg[HANDLE] && isNested) {
    return (
      <div
        className={'font-bold px-2'}
        style={{
          color: theme.highlightText,
          position: edgesFromFields ? 'relative' : undefined,
        }}
      >
        {'*' + msg[HANDLE]?.label}
        <Handle
          type={'source'}
          position={Position.Right}
          id={msg[HANDLE]?.id}
        />
      </div>
    );
  }

  const custom = nodeRender?.({ msg, theme, isNested });
  if (custom) {
    return (
      <div ref={ref}>
        {msg[HANDLE] && !isNested && (
          <Handle type="target" position={Position.Left} id={msg[HANDLE]?.id} />
        )}
        {custom}
      </div>
    );
  }

  return (
    <div ref={ref}>
      {msg[HANDLE] && !isNested && (
        <Handle type="target" position={Position.Left} id={msg[HANDLE]?.id} />
      )}
      <Box tag={msg.$typeName} node={isNested ? undefined : msg}>
        {Object.entries(msg).map(([k, v]) => {
          for (const pref of ['$', '__']) {
            if (k.startsWith(pref)) return null;
          }
          return (
            <Entry key={k} name={k}>
              <SmartNode data={v} isNested={true} />
            </Entry>
          );
        })}
      </Box>
    </div>
  );
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

export default React.memo(SmartNode);
