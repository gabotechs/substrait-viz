import { PlanRelSchema, PlanSchema } from './gen/substrait/plan_pb.ts';
import {
  AggregateRelSchema,
  ConsistentPartitionWindowRelSchema,
  CrossRelSchema,
  DdlRelSchema,
  ExchangeRelSchema,
  ExpandRelSchema,
  ExtensionLeafRelSchema,
  ExtensionMultiRelSchema,
  ExtensionSingleRelSchema,
  FetchRelSchema,
  FilterRelSchema,
  HashJoinRelSchema,
  JoinRelSchema,
  MergeJoinRelSchema,
  NestedLoopJoinRelSchema,
  ProjectRelSchema,
  ReadRelSchema,
  ReferenceRelSchema,
  RelRootSchema,
  RelSchema,
  SetRelSchema,
  SortRelSchema,
  WriteRelSchema,
} from './gen/substrait/algebra_pb.ts';
import { GenMessage } from '@bufbuild/protobuf/codegenv1';
import { Message } from '@bufbuild/protobuf';
import { CompileConfig } from './compile.ts';

function buildConfig<G extends GenMessage<Message>>(
  cfg: CompileConfig<G>,
): CompileConfig<G> {
  return cfg;
}

export const CONFIG = buildConfig({
  /**
   * All of these will be treated as nodes in the React flow graph.
   */
  nodes: [
    PlanSchema,
    PlanRelSchema,
    RelRootSchema,
    RelSchema,
    ReadRelSchema,
    FilterRelSchema,
    FetchRelSchema,
    AggregateRelSchema,
    SortRelSchema,
    JoinRelSchema,
    ProjectRelSchema,
    SetRelSchema,
    ExtensionSingleRelSchema,
    ExtensionMultiRelSchema,
    ExtensionLeafRelSchema,
    CrossRelSchema,
    ReferenceRelSchema,
    WriteRelSchema,
    DdlRelSchema,
    HashJoinRelSchema,
    MergeJoinRelSchema,
    NestedLoopJoinRelSchema,
    ConsistentPartitionWindowRelSchema,
    ExchangeRelSchema,
    ExpandRelSchema,
  ],
  passThrough: n => {
    if (n.$typeName === 'substrait.Rel') return n.relType.value;
    if (n.$typeName === 'substrait.PlanRel') return n.relType.value;
  },
});
