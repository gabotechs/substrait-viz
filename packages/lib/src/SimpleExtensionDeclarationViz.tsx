import { HTMLProps } from 'react';
import { SimpleExtensionDeclaration } from './gen/substrait/extensions/extensions_pb';

export interface SimpleExtensionDeclarationVizProps
  extends HTMLProps<HTMLSpanElement> {
  ext: SimpleExtensionDeclaration;
}
export function SimpleExtensionDeclarationViz({
  ext,
  ...rest
}: SimpleExtensionDeclarationVizProps) {
  switch (ext.mappingType.case) {
    case 'extensionType': {
      const { name, typeAnchor, extensionUriReference } = ext.mappingType.value;
      return (
        <span {...rest}>
          $t{typeAnchor}: <span className="font-bold">{name}</span> (*
          {extensionUriReference})
        </span>
      );
    }
    case 'extensionFunction': {
      const { name, functionAnchor, extensionUriReference } =
        ext.mappingType.value;
      return (
        <span {...rest}>
          $f{functionAnchor}: <span className="font-bold">{name}</span> (*
          {extensionUriReference})
        </span>
      );
    }
    case 'extensionTypeVariation': {
      const { name, typeVariationAnchor, extensionUriReference } =
        ext.mappingType.value;
      return (
        <span {...rest}>
          $tv{typeVariationAnchor}: <span className="font-bold">{name}</span> (*
          {extensionUriReference})
        </span>
      );
    }
    case undefined:
      return null;
  }
}
