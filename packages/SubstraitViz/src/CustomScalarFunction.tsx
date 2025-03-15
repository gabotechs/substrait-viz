import { CustomRenderProps, SmartNode } from '@protobuf-viz/react';
import { Expression_ScalarFunction } from './gen/substrait/algebra_pb.ts';

export function CustomScalarFunction({
  msg,
  ...props
}: CustomRenderProps<Expression_ScalarFunction>) {
  return (
    <span className={'whitespace-nowrap flex flex-row'}>
      $f{msg.functionReference}(
      {msg.arguments.map((arg, i, arr) => (
        <>
          <SmartNode data={arg} key={i} {...props} />
          {i < arr.length - 1 && <span className={'mr-2'}>,</span>}
        </>
      ))}
      )
    </span>
  );
}
