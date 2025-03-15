import { castMsg, CustomRenderProps, SmartNode } from '@protobuf-viz/react';
import { Expression_ScalarFunction } from './gen/substrait/algebra_pb.ts';
import { Plan } from './gen/substrait/plan_pb.ts';

export function CustomScalarFunction({
  msg,
  rootMsg,
  ...props
}: CustomRenderProps<Expression_ScalarFunction>) {
  let name;
  const plan = castMsg<Plan>('substrait.Plan', rootMsg);
  if (plan) {
    name = getFunctionName(plan, msg.functionReference);
  }
  name ??= `$f${msg.functionReference}`;
  return (
    <span className={'whitespace-nowrap flex flex-row'}>
      {name}(
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

function getFunctionName(msg: Plan, i: number): string | undefined {
  for (const ext of msg.extensions) {
    if (ext.mappingType.case === 'extensionFunction') {
      if (ext.mappingType.value.functionAnchor === i) {
        return ext.mappingType.value.name;
      }
    }
  }
}
