import { RelCommon_Direct } from './gen/substrait/algebra_pb.ts';
import { CustomRenderProps } from './ProtobufViz/render.ts';

export function CustomDirect({ msg }: CustomRenderProps<RelCommon_Direct>) {
  return <div>{msg.$typeName.split('.').slice(-1)[0]}</div>;
}
