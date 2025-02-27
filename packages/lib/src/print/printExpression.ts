import { Expression } from '../gen/substrait/algebra_pb.ts';
import { printFunctionArg } from './printFunctionArg.ts';
import { printLiteral } from './printLiteral.ts';
import { printType } from './printType.ts';

export function printExpression(expr?: Expression): string {
  if (expr == null) return '';
  const rex = expr.rexType;
  let result = '';

  switch (rex.case) {
    case 'switchExpression':
      for (const exp of rex.value.ifs) {
        result += `if (${printLiteral(exp.if)}) ${printExpression(exp.then)} `;
      }
      if (rex.value.else) result += `else ${printExpression(rex.value.else)}`;
      if (rex.value.match)
        result += `match ${printExpression(rex.value.match)}`;

      return result;

    case 'ifThen':
      for (const exp of rex.value.ifs) {
        result += `if (${printExpression(exp.if)}) ${printExpression(exp.then)} `;
      }
      if (rex.value.else) result += `else ${printExpression(rex.value.else)}`;

      return result;

    case 'cast':
      return `CAST(${printExpression(rex.value.input)} AS ${printType(rex.value.type)})`;

    case 'literal':
      return printLiteral(rex.value);

    case 'scalarFunction':
      return `$f${rex.value.functionReference}(${rex.value.arguments.map(printFunctionArg).join(', ')})`;

    case 'windowFunction':
      return `$f${rex.value.functionReference}(${rex.value.arguments.map(printFunctionArg).join(', ')} | TODO: other window function fields)`;

    case 'selection':
      switch (rex.value.rootType.case) {
        case 'expression':
          return `selection[${printExpression(rex.value.rootType.value)}]`;
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
