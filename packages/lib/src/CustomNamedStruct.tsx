import { NamedStruct } from './gen/substrait/type_pb.ts';
import { CustomRenderProps } from './ProtobufViz/render.ts';
import SmartField from './ProtobufViz/SmartField.tsx';

export function CustomNamedStruct({ msg }: CustomRenderProps<NamedStruct>) {
  return (
    <div className={'flex flex-col gap-2'}>
      {msg.names.map((name, i) => (
        <div className={'flex flex-row gap-2 text-nowrap'} key={i}>
          {name} (<SmartField data={msg.struct?.types[i]} />)
        </div>
      ))}
    </div>
  );
}
