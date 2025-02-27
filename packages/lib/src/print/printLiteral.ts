import { Expression_Literal } from '../gen/substrait/algebra_pb.ts';

export function printLiteral(expressionLiteral?: Expression_Literal): string {
  if (expressionLiteral == null) return '';
  const lit = expressionLiteral.literalType;

  switch (lit.case) {
    case 'boolean':
      return lit.value.toString();
    case 'i8':
      return lit.value.toString();
    case 'i16':
      return lit.value.toString();
    case 'i32':
      return lit.value.toString();
    case 'i64':
      return lit.value.toString();
    case 'fp32':
      return lit.value.toString();
    case 'fp64':
      return lit.value.toString();
    case 'string':
      return lit.value.toString();
    case 'binary':
      return lit.value.toString();
    case 'date':
      return lit.value.toString();
    case 'time':
      return lit.value.toString();
    case 'intervalYearToMonth':
      return `interval ${lit.value.years} years ${lit.value.months} months`;
    case 'intervalDayToSecond':
      return `interval ${lit.value.days} days ${lit.value.seconds} s ${lit.value.microseconds} ms`;
    case 'fixedChar':
      return lit.value.toString();
    case 'varChar':
      return lit.value.toString();
    case 'fixedBinary':
      return lit.value.toString();
    case 'decimal':
      return `Decimal literal (${lit.value.precision}, ${lit.value.scale})`;
    case 'timestamp':
      return new Date(Number(lit.value) / 1e3).toString();
    case 'timestampTz':
      return new Date(Number(lit.value) / 1e3).toString();
    case 'precisionTimestamp':
      return new Date(
        (Number(lit.value.value) * 1e3) / 1 ** lit.value.precision,
      ).toString();
    case 'precisionTimestampTz':
      return new Date(
        (Number(lit.value.value) * 1e3) / 1 ** lit.value.precision,
      ).toString();
    case 'struct':
      return `(${lit.value.fields.map(printLiteral).join(', ')})`;
    case 'map':
      return `{${lit.value.keyValues.map(({ key, value }) => `"${printLiteral(key)}": ${printLiteral(value)}`).join(', ')}}`;
    case 'uuid':
      return lit.value.toString();
    case 'null':
      return 'null';
    case 'list':
      return `[${lit.value.values.map(printLiteral).join(', ')}]`;
    case 'emptyList':
      return '[]';
    case 'emptyMap':
      return '{}';
    case 'userDefined':
      return `User Defined: (${JSON.stringify(lit.value.val.value)})`;
    case undefined:
      return '';
  }
}
