import { HTMLProps } from 'react';
import { RelCommon } from './gen/substrait/algebra_pb';

export interface RelCommonVizProps extends HTMLProps<HTMLSpanElement> {
  relCommon: RelCommon;
}

export function RelCommonViz({
  relCommon: { emitKind },
  ...rest
}: RelCommonVizProps) {
  switch (emitKind.case) {
    case 'direct':
      return <span {...rest}>direct</span>;
    case 'emit':
      return (
        <span {...rest}>
          emit: {JSON.stringify(emitKind.value.outputMapping)}
        </span>
      );
    case undefined:
      return <span {...rest}>undefined</span>;
  }
}
