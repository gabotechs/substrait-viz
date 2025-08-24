import { Registry } from '@bufbuild/protobuf';
import {
  ProtoFile,
  protoFileToBin,
  protoFileToJson,
} from '@protobuf-viz/react';
import { PlanSchema } from './gen/substrait/plan_pb.ts';

export function substraitFileToBin(
  protoFile: ProtoFile,
  registry?: Registry,
): Promise<Uint8Array> {
  return protoFileToBin(protoFile, PlanSchema, registry);
}
export function substraitFileToJson(
  protoFile: ProtoFile,
  registry?: Registry,
): Promise<string> {
  return protoFileToJson(protoFile, PlanSchema, registry);
}
