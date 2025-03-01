import { Expression_ReferenceSegment } from '../gen/substrait/algebra_pb.ts';
import { printLiteral } from './printLiteral.ts';

export function printReferenceSegment(
  node: Expression_ReferenceSegment,
): string {
  switch (node.referenceType.case) {
    case 'mapKey':
      return printLiteral(node.referenceType.value.mapKey);
    case 'structField':
      return node.referenceType.value.field.toString();
    case 'listElement':
      return node.referenceType.value.offset.toString();
    case undefined:
      return 'undefined';
  }
}
