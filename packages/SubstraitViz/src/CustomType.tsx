import { CustomRenderProps } from '@protobuf-viz/react';
import { Type } from './gen/substrait/type_pb.ts';

export function CustomType({ msg }: CustomRenderProps<Type>) {
  if (msg.kind.case === undefined) return null;
  if (msg.kind.case === 'userDefinedTypeReference')
    return `udt (${msg.kind.value})`;

  return msg.kind.value.$typeName.split('.').slice(-1)[0];
}
