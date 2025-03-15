import { fromBinary, JsonValue, Message } from '@bufbuild/protobuf';
import React from 'react';

import { Any } from '@bufbuild/protobuf/wkt';
import { Handle, Position } from '@xyflow/react';
import {
  castAnyMsg,
  castAnyMsgArr,
  castAnyOneOf,
  castAnyOneOfArr,
  castMsg,
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
import { Expandable } from './components/Expandable.tsx';
import { NumberList } from './components/NumberList.tsx';
import { StringList } from './components/StringList.tsx';
import { useRenderConfig } from './render.ts';
import { stringify } from './stringify.ts';
import { useTheme } from './theme.ts';

export interface SmartNodeProps {
  data: unknown;
  isNested?: boolean;
}

function SmartNode({ data, ...props }: SmartNodeProps) {
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
    let n = castAnyMsg(data);
    if (n) {
      const msgStack = [];
      while (n) {
        msgStack.push(n);
        const entries = msgEntries(n);
        n = undefined;
        if (entries.length === 1) {
          const [, v] = entries[0];
          n = castAnyOneOf(v)?.value;
        }
      }
      return <MsgStack msgStack={msgStack} {...props} />;
    }
  }
  {
    const n = castAnyOneOf(data);
    if (n) return <MsgStack msgStack={[n.value]} {...props} />;
  }
  {
    const n = castAnyMsgArr(data);
    if (n)
      return (
        <div className="flex flex-col gap-2">
          {n.map((v, i) => (
            <SmartNode {...props} key={i} data={v} />
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
            <SmartNode {...props} key={i} data={v.value} />
          ))}
        </div>
      );
  }

  return stringify(trimJsonDepth(data, 2));
}

function MsgStack({
  msgStack,
  isNested = false,
}: {
  msgStack: (Message & NodeExt)[];
  isNested?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const { nodeRender, edgesFromFields, registry, rootMsg } = useRenderConfig();
  const theme = useTheme();

  msgStack = React.useMemo(() => {
    return msgStack.map(msg => {
      const anyMsg = castMsg<Any>('google.protobuf.Any', msg);
      if (!anyMsg) return msg;

      const type = anyMsg.typeUrl.replace(/^type.googleapis.com\//, '');
      const desc = registry?.getMessage(type);
      if (!desc) return msg;

      return fromBinary(desc, anyMsg.value);
    });
  }, [msgStack, registry]);

  for (const msg of msgStack) {
    msg[WIDTH_ATTRIBUTE] = ref.current?.clientWidth;
    msg[HEIGHT_ATTRIBUTE] = ref.current?.clientHeight;
  }

  for (const msg of msgStack) {
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
  }

  let custom: React.ReactNode = null;
  for (const msg of msgStack) {
    custom = nodeRender?.({ msg, theme, isNested, rootMsg });
    if (custom) break;
  }

  const msg = msgStack.slice(-1)[0];

  return (
    <Expandable
      ref={ref}
      isExpandable={!!custom}
      expanded={expanded}
      setExpanded={setExpanded}
    >
      {!isNested &&
        msgStack
          .map(m => m[HANDLE]!) // ! only valid if .filter(h => h)
          .filter(h => h)
          .map(({ id }) => (
            <Handle key={id} type="target" position={Position.Left} id={id} />
          ))}
      {custom && !expanded ? (
        custom
      ) : (
        <Box tag={tag(msgStack)}>
          {msgEntries(msg).map(([k, v]) => (
            <Entry key={k} name={k}>
              <SmartNode data={v} isNested={true} />
            </Entry>
          ))}
        </Box>
      )}
    </Expandable>
  );
}

function tag(msgStack: Message[]): string {
  return msgStack
    .map(m => m.$typeName)
    .map(cleanTypeName)
    .join(' > ');
}

function cleanTypeName(typeName: string): string {
  return typeName.split('.').slice(-1)[0];
}

function msgEntries(msg: Message): Array<[string, unknown]> {
  return Object.entries(msg).filter(([k]) => !['$', '_'].includes(k[0]));
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
