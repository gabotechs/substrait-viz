import { FunctionArgument } from '../gen/substrait/algebra_pb.ts';
import { printExpression } from './printExpression.ts';
import { printType } from './printType.ts';

export function printFunctionArg(argument?: FunctionArgument): string {
  if (argument == null) return '';
  const arg = argument.argType;

  switch (arg.case) {
    case 'enum':
      return arg.value;
    case 'value':
      return printExpression(arg.value);
    case 'type':
      return printType(arg.value);
    case undefined:
      return 'undefined';
  }
}
