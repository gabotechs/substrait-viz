import { CustomRenderProps } from '@protobuf-viz/react';
import { Type } from './gen/substrait/type_pb.ts';
import { SubstraitVizTheme } from './theme.ts';

export function CustomType({
  msg,
  theme,
}: CustomRenderProps<Type, SubstraitVizTheme>) {
  const wrap = (n: string) => <span style={{ color: theme.type }}>{n}</span>;

  if (msg.kind.case === undefined) return null;
  if (msg.kind.case === 'userDefined') return wrap(`udt[${msg.kind.value}]`);
  if (msg.kind.case === 'userDefinedTypeReference')
    return wrap(`udtr[${msg.kind.value}]`);

  return wrap(msg.kind.value.$typeName.split('.').slice(-1)[0]);
}
