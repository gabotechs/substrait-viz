import { Version } from './gen/substrait/plan_pb.ts';
import { CustomRenderProps } from './ProtobufViz/render.ts';

export function VersionComponent({ msg }: CustomRenderProps<Version>) {
  const { majorNumber = '?', minorNumber = '?', patchNumber = '?' } = msg;
  return (
    <span>
      {majorNumber}.{minorNumber}.{patchNumber}
    </span>
  );
}
