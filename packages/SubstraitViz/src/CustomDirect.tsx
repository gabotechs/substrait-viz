import { CustomRenderProps } from '@protobuf-viz/react';
import { RelCommon_Direct } from './gen/substrait/algebra_pb.ts';

export function CustomDirect({ msg }: CustomRenderProps<RelCommon_Direct>) {
  return <div>{msg.$typeName.split('.').slice(-1)[0]}</div>;
}
