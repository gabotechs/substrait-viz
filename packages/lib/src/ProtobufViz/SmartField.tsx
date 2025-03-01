import React from 'react';
import { JsonValue, Message } from '@bufbuild/protobuf';

import {
  castAnyMsg,
  castAnyMsgArr,
  castAnyOneOf,
  castAnyOneOfArr,
  castString,
  castStringList,
} from './cast.ts';
import { StringList } from './components/StringList.tsx';
import { Entry } from './components/Entry.tsx';
import { useTheme } from './theme/useTheme.ts';
import { Tag } from './components/Tag.tsx';

function Field({ data }: { data: unknown }) {
  {
    const n = castStringList(data);
    if (n) return <StringList entries={n} />;
  }

  {
    const n = castString(data);
    if (n) return n;
  }

  {
    const n = castAnyMsg(data);
    if (n) return <Msg msg={n} />;
  }

  {
    const n = castAnyOneOf(data);
    if (n) return <Msg msg={n.value} />;
  }

  {
    const n = castAnyMsgArr(data);
    if (n)
      return (
        <div className="flex flex-col gap-2">
          {n.map((v, i) => (
            <Msg key={i} msg={v} />
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
            <Msg key={i} msg={v.value} />
          ))}
        </div>
      );
  }

  return JSON.stringify(trimJsonDepth(data, 2));
}

function Msg({ msg }: { msg: Message }) {
  const { boxBorder } = useTheme();
  return (
    <div
      className="relative flex flex-col p-2 border-2 rounded-md gap-2"
      style={{ borderColor: boxBorder }}
    >
      <Tag type={msg.$typeName} />
      <div className={'h-2'} />
      {Object.entries(msg).map(([k, v]) => {
        for (const pref of ['$', '__']) {
          if (k.startsWith(pref) || pref.startsWith(k)) return null;
        }
        return (
          <Entry key={k} name={k}>
            <Field data={v} />
          </Entry>
        );
      })}
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

export default React.memo(Field);
