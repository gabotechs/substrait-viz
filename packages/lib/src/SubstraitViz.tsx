import { ProtobufViz, ProtobufVizProps } from './ProtobufViz/ProtobufViz.tsx';
import { CONFIG } from './config.ts';
import { fromJsonString, Message } from '@bufbuild/protobuf';
import { PlanSchema } from './gen/substrait/plan_pb.ts';
import { GenMessage } from '@bufbuild/protobuf/codegenv1';

export interface SubstraitVizProps
  extends Omit<ProtobufVizProps<GenMessage<Message>>, 'rootNode' | 'config'> {
  plan: string;
}

export function SubstraitViz({ plan, ...props }: SubstraitVizProps) {
  return (
    <ProtobufViz
      config={CONFIG}
      rootNode={fromJsonString(PlanSchema, plan)}
      {...props}
    />
  );
}
