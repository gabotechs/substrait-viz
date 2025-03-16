import { CustomRenderProps, SmartNode } from '@protobuf-viz/react';
import { CustomType } from './CustomType.tsx';
import { Expression_Cast } from './gen/substrait/algebra_pb.ts';
import { SubstraitVizTheme } from './theme.ts';

export function CustomCast({
  msg,
  ...props
}: CustomRenderProps<Expression_Cast, SubstraitVizTheme>) {
  return (
    <span className={'whitespace-nowrap flex flex-row'}>
      <SmartNode data={msg.input} {...props} />
      <span>::</span>
      {msg.type && <CustomType msg={msg.type} {...props} />}
    </span>
  );
}
