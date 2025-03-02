import { CustomRenderProps } from './ProtobufViz/render.ts';
import { Expression_ReferenceSegment } from './gen/substrait/algebra_pb.ts';
import { printLiteral } from './print/printLiteral.ts';

export function CustomReferenceSegment(
  props: CustomRenderProps<Expression_ReferenceSegment>,
) {
  const n = props.msg.referenceType;
  const wrap = (n: string) => <div className={'text-nowrap'}>{n}</div>;
  switch (n.case) {
    case 'mapKey':
      return wrap(printLiteral(n.value.mapKey));
    case 'listElement':
      return wrap(`offset ${n.value.offset}`);
    case 'structField':
      return wrap(`field ${n.value.field}`);
    case undefined:
      return null;
  }
}
