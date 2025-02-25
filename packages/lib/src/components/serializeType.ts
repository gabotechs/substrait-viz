import { Type } from '../gen/substrait/type_pb';

export function serializeType(t?: Type): string {
  if (t == null) return '';

  const type = t.kind;
  switch (type.case) {
    case 'bool':
      return 'bool';
    case 'i8':
      return 'i8';
    case 'i16':
      return 'i16';
    case 'i32':
      return 'i32';
    case 'i64':
      return 'i64';
    case 'fp32':
      return 'fp32';
    case 'fp64':
      return 'fp64';
    case 'string':
      return 'string';
    case 'binary':
      return 'binary';
    case 'timestamp':
      return 'timestamp';
    case 'date':
      return 'date';
    case 'time':
      return 'time';
    case 'intervalYear':
      return 'intervalYear';
    case 'intervalDay':
      return 'intervalDay';
    case 'timestampTz':
      return 'timestampTz';
    case 'uuid':
      return 'uuid';
    case 'fixedChar':
      return 'fixedChar';
    case 'varchar':
      return 'varchar';
    case 'fixedBinary':
      return 'fixedBinary';
    case 'decimal':
      return 'decimal';
    case 'precisionTimestamp':
      return 'precisionTimestamp';
    case 'precisionTimestampTz':
      return 'precisionTimestampTz';
    case 'struct':
      return 'struct';
    case 'list':
      return 'list';
    case 'map':
      return 'map';
    case 'userDefined':
      return 'userDefined';
    case 'userDefinedTypeReference':
      return 'userDefinedTypeReference';
    case undefined:
      return 'undefined';
  }
}
