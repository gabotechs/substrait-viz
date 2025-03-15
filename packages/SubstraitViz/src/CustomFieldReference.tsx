import { CustomRenderProps, SmartNode } from '@protobuf-viz/react';
import { CustomReferenceSegment } from './CustomReferenceSegment.tsx';
import { Expression_FieldReference } from './gen/substrait/algebra_pb.ts';
import { SubstraitVizTheme } from './theme.ts';

export function CustomFieldReference({
  msg,
  theme,
  ...rest
}: CustomRenderProps<Expression_FieldReference, SubstraitVizTheme>) {
  return (
    <div className={'flex flex-row'}>
      {msg.referenceType.case === 'directReference' && (
        <CustomReferenceSegment
          {...rest}
          msg={msg.referenceType.value}
          theme={theme}
        />
      )}
      {msg.referenceType.case === 'maskedReference' && (
        <SmartNode {...rest} data={msg.referenceType.value} />
      )}
      {msg.rootType.case !== 'rootReference' && (
        <SmartNode {...rest} data={msg.rootType} />
      )}
    </div>
  );
}
