import { GenMessage } from '@bufbuild/protobuf/codegenv1';
import { fromJsonString, Message } from '@bufbuild/protobuf';

import { PlanSchema } from './gen/substrait/plan_pb.ts';
import { ProtobufViz, ProtobufVizProps } from './ProtobufViz/ProtobufViz.tsx';
import { CUSTOM_COMPILE } from './customCompile.ts';
import { RENDER_CONFIG } from './customRender.tsx';
import './SubstraitViz.css';

export interface SubstraitVizProps
  extends Omit<ProtobufVizProps<GenMessage<Message>>, 'rootNode' | 'config'> {
  plan: string;
}

export function SubstraitViz({ plan, ...props }: SubstraitVizProps) {
  return (
    <ProtobufViz
      config={CUSTOM_COMPILE}
      render={RENDER_CONFIG}
      rootNode={fromJsonString(PlanSchema, plan)}
      {...props}
    />
  );
}
