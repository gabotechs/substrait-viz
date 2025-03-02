import { CustomRenderProps } from './ProtobufViz/render.ts';
import { SimpleExtensionDeclaration } from './gen/substrait/extensions/extensions_pb.ts';

export function CustomSimpleExtensionDeclaration({
  msg,
}: CustomRenderProps<SimpleExtensionDeclaration>) {
  const { value, case: case_ } = msg.mappingType;
  const wrap = (n: string) => <span className={'text-nowrap'}>{n}</span>;
  switch (case_) {
    case 'extensionFunction':
      return wrap(
        `$f${value.functionAnchor}: ${value.name} (*${value?.extensionUriReference})`,
      );
    case 'extensionType':
      return wrap(
        `$t${value.typeAnchor}: ${value.name} (*${value?.extensionUriReference})`,
      );
    case 'extensionTypeVariation':
      return wrap(
        `$tv${value.typeVariationAnchor}: ${value.name} (*${value?.extensionUriReference})`,
      );
    case undefined:
  }
}
