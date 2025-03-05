import { NamedStruct } from './gen/substrait/type_pb.ts';
import { CustomRenderProps } from './ProtobufViz/render.ts';
import SmartNode from './ProtobufViz/SmartNode.tsx';

export function CustomNamedStruct({
  msg,
  ...rest
}: CustomRenderProps<NamedStruct>) {
  return (
    <div className={'flex flex-col gap-2'}>
      {msg.names.map((name, i) => (
        <div className={'flex flex-row gap-2 text-nowrap'} key={i}>
          {name} (<SmartNode {...rest} data={msg.struct?.types[i]} />)
        </div>
      ))}
    </div>
  );
}
