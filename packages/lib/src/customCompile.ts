import { PlanRelSchema, PlanSchema } from './gen/substrait/plan_pb.ts';
import { RelSchema } from './gen/substrait/algebra_pb.ts';
import { GenMessage } from '@bufbuild/protobuf/codegenv1';
import { Message } from '@bufbuild/protobuf';
import { CompileConfig } from './ProtobufViz/compile.ts';

export const CUSTOM_COMPILE = buildConfig({
  /**
   * All of these will be treated as nodes in the React flow graph.
   */
  nodes: [PlanSchema, PlanRelSchema, RelSchema],
});

function buildConfig<G extends GenMessage<Message>>(
  cfg: CompileConfig<G>,
): CompileConfig<G> {
  return cfg;
}
