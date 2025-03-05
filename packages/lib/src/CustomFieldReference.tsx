import { CustomRenderProps } from './ProtobufViz/render.ts';
import { Expression_FieldReference } from './gen/substrait/algebra_pb.ts';
import { CustomReferenceSegment } from './CustomReferenceSegment.tsx';
import SmartNode from './ProtobufViz/SmartNode.tsx';

export function CustomFieldReference({
  msg,
  theme,
  ...rest
}: CustomRenderProps<Expression_FieldReference>) {
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
