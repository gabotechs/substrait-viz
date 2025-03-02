import { CustomRenderProps } from './ProtobufViz/render.ts';
import { SimpleExtensionURI } from './gen/substrait/extensions/extensions_pb.ts';

export function CustomSimpleExtensionUri({
  msg,
}: CustomRenderProps<SimpleExtensionURI>) {
  return (
    <span className={'text-nowrap'}>
      *{msg.extensionUriAnchor}: {msg.uri}
    </span>
  );
}
