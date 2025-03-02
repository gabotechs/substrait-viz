import { CustomRenderProps } from './ProtobufViz/render.ts';
import { Expression_FieldReference } from './gen/substrait/algebra_pb.ts';
import { CustomReferenceSegment } from './CustomReferenceSegment.tsx';
import SmartField from './ProtobufViz/SmartField.tsx';

export function CustomFieldReference({
  msg,
  theme,
}: CustomRenderProps<Expression_FieldReference>) {
  return (
    <div className={'flex flex-row'}>
      {msg.referenceType.case === 'directReference' && (
        <CustomReferenceSegment msg={msg.referenceType.value} theme={theme} />
      )}
      {msg.referenceType.case === 'maskedReference' && (
        <SmartField data={msg.referenceType.value} />
      )}
      {msg.rootType.case !== 'rootReference' && (
        <SmartField data={msg.rootType} />
      )}
    </div>
  );
}
