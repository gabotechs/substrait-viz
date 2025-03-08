import { CustomRenderProps } from '@protobuf-viz/react';
import { Expression_FieldReference_RootReference } from './gen/substrait/algebra_pb.ts';

export function CustomRootReference(
  props: CustomRenderProps<Expression_FieldReference_RootReference>,
) {
  return props.msg.$typeName.split('.').slice(-1)[0];
}
