import { CustomRenderProps } from '@protobuf-viz/react';
import { CustomType } from './CustomType.tsx';
import { NamedStruct } from './gen/substrait/type_pb.ts';
import { SubstraitVizTheme } from './theme.ts';

export function CustomNamedStruct({
  msg,
  theme,
  ...props
}: CustomRenderProps<NamedStruct, SubstraitVizTheme>) {
  return (
    <div className={'flex flex-col gap-2'}>
      {msg.names.map((name, i) => (
        <div className={'flex flex-row text-nowrap'} key={i}>
          <span style={{ color: theme.fieldRef }}>{name}</span>
          <span>[</span>
          {msg.struct?.types[i] && (
            <CustomType msg={msg.struct.types[i]} theme={theme} {...props} />
          )}
          <span>]</span>
        </div>
      ))}
    </div>
  );
}
