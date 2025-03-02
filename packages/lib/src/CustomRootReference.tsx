import { Expression_FieldReference_RootReference } from './gen/substrait/algebra_pb.ts';
import { CustomRenderProps } from './ProtobufViz/render.ts';

export function CustomRootReference(
  props: CustomRenderProps<Expression_FieldReference_RootReference>,
) {
  return props.msg.$typeName.split('.').slice(-1)[0];
}
