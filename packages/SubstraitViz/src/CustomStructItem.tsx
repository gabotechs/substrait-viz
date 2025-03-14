import { CustomRenderProps } from '@protobuf-viz/react';
import { Expression_MaskExpression_StructItem } from './gen/substrait/algebra_pb.ts';

export function CustomStructItem({
  msg,
}: CustomRenderProps<Expression_MaskExpression_StructItem>) {
  return <div className={'text-nowrap'}>field {msg.field}</div>;
}
