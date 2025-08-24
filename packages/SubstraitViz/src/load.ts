import { ProtoFile, protoFileToBin } from '@protobuf-viz/react';
import { PlanSchema } from './gen/substrait/plan_pb.ts';
import { Registry } from '@bufbuild/protobuf';

export function substraitFileToBin(protoFile: ProtoFile, registry?: Registry): Promise<Uint8Array> {
  return protoFileToBin(protoFile, PlanSchema, registry);
}