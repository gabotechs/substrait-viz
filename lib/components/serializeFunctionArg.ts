import { FunctionArgument } from '../gen/substrait/algebra_pb';
import { serializeExpression } from './serializeExpression';
import { serializeType } from './serializeType';

export function serializeFunctionArg(argument?: FunctionArgument): string {
  if (argument == null) return '';
  const arg = argument.argType;

  switch (arg.case) {
    case 'enum':
      return arg.value;
    case 'value':
      return serializeExpression(arg.value);
    case 'type':
      return serializeType(arg.value);
    case undefined:
      return 'undefined';
  }
}
