import { CustomRenderProps, SmartNode } from '@protobuf-viz/react';
import { Expression_Cast } from './gen/substrait/algebra_pb.ts';
import { printType } from './print/printType.ts';

export function CustomCast({
  msg,
  ...props
}: CustomRenderProps<Expression_Cast>) {
  return (
    <span className={'whitespace-nowrap flex flex-row gap-1'}>
      CAST({<SmartNode data={msg.input} {...props} />} AS {printType(msg.type)}{' '}
      )
    </span>
  );
}
