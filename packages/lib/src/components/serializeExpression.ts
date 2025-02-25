import { Expression } from '../gen/substrait/algebra_pb';
import { serializeFunctionArg } from './serializeFunctionArg';
import { serializeLiteral } from './serializeLiteral';
import { serializeType } from './serializeType';

export function serializeExpression(expr?: Expression): string {
  if (expr == null) return '';
  const rex = expr.rexType;
  let result = '';

  switch (rex.case) {
    case 'switchExpression':
      for (const exp of rex.value.ifs) {
        result += `if (${serializeLiteral(exp.if)}) ${serializeExpression(exp.then)} `;
      }
      if (rex.value.else)
        result += `else ${serializeExpression(rex.value.else)}`;
      if (rex.value.match)
        result += `match ${serializeExpression(rex.value.match)}`;

      return result;

    case 'ifThen':
      for (const exp of rex.value.ifs) {
        result += `if (${serializeExpression(exp.if)}) ${serializeExpression(exp.then)} `;
      }
      if (rex.value.else)
        result += `else ${serializeExpression(rex.value.else)}`;

      return result;

    case 'cast':
      return `CAST(${serializeExpression(rex.value.input)} AS ${serializeType(rex.value.type)})`;

    case 'literal':
      return serializeLiteral(rex.value);

    case 'scalarFunction':
      return `$f${rex.value.functionReference}(${rex.value.arguments.map(serializeFunctionArg).join(', ')})`;

    case 'windowFunction':
      return `$f${rex.value.functionReference}(${rex.value.arguments.map(serializeFunctionArg).join(', ')} | TODO: other window function fields)`;

    case 'selection':
      switch (rex.value.rootType.case) {
        case 'expression':
          return `selection[${serializeExpression(rex.value.rootType.value)}]`;
        case 'rootReference':
          return `selection[root reference]`;
        case 'outerReference':
          return `selection[outer reference ${rex.value.rootType.value.stepsOut} steps]`;
        case undefined:
          return 'undefined';
      }

      // TODO
      return `${rex.case} [TODO]`;

    case 'singularOrList':
      // TODO
      return `${rex.case} [TODO]`;
    case 'enum':
      // TODO
      return `${rex.case} [TODO]`;
    case 'nested':
      // TODO
      return `${rex.case} [TODO]`;
    case 'subquery':
      // TODO
      return `${rex.case} [TODO]`;
    case 'multiOrList':
      // TODO
      return `${rex.case} [TODO]`;
    case undefined:
      return 'undefined';
  }
}
