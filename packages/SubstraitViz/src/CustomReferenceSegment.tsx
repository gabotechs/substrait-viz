import { CustomRenderProps } from '@protobuf-viz/react';
import { Expression_ReferenceSegment } from './gen/substrait/algebra_pb.ts';
import { printLiteral } from './print/printLiteral.ts';
import { SubstraitVizTheme } from './theme.ts';

export function CustomReferenceSegment({
  msg,
  theme,
}: CustomRenderProps<Expression_ReferenceSegment, SubstraitVizTheme>) {
  const n = msg.referenceType;
  const wrap = (n: string) => (
    <div className={'text-nowrap'} style={{ color: theme.fieldRef }}>
      {n}
    </div>
  );
  switch (n.case) {
    case 'mapKey':
      return wrap(printLiteral(n.value.mapKey));
    case 'listElement':
      return wrap(`offset<${n.value.offset}>`);
    case 'structField':
      return wrap(`*${n.value.field}`);
    case undefined:
      return null;
  }
}
