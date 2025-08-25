import {
  createFileRegistry,
  FileRegistry,
  fromBinary,
  fromJson,
  MessageShape,
  Registry,
  toBinary,
  toJsonString,
} from '@bufbuild/protobuf';
import { FileDescriptorSetSchema } from '@bufbuild/protobuf/wkt';
import { MessageSchema } from './compile.ts';
import { fetchFile, Json, ProtoFile } from './file.ts';

/**
 * Builds a registry out of a list of binary proto descriptor sets.
 * @param protoDescriptorSets list of proto descriptor sets.
 */
export async function loadRegistry(
  protoDescriptorSets: ProtoFile[] = [],
): Promise<Registry | undefined> {
  if (protoDescriptorSets.length > 0) {
    return createFileRegistry(
      ...(await Promise.all(protoDescriptorSets.map(buildRegistry))),
    );
  }
}

/**
 * Decodes a protobuf message based on the provided payload and
 * schema. Optionally, use the registry created out of the
 * `protoDescriptorSets` for decoding Any messages.
 *
 * @param payload protobuf message payload it can be:
 *  - a JSON payload
 *  - a binary payload
 *  - a binary payload encoded as base64
 *  - a URL pointing to any of the three above
 * @param schema schema for decoding the message.
 * @param registry optional registry containing info useful for
 *  decoding unknown Any messages.
 */
export async function loadMessage<S extends MessageSchema>(
  payload: ProtoFile,
  schema: S,
  registry?: Registry,
): Promise<MessageShape<S>> {
  const file = await fetchFile(payload);
  if (file instanceof Json) {
    return fromJson(schema, file.value, { registry });
  } else {
    // TODO: how can it be that I'm not able to pass a registry here.
    return fromBinary(schema, file);
  }
}

export async function buildRegistry(
  descriptor: ProtoFile,
): Promise<FileRegistry> {
  const bin = await fetchFile(descriptor);
  if (bin instanceof Json)
    throw new Error('JSON is not supported for a proto descriptor file');
  const msg = fromBinary(FileDescriptorSetSchema, bin);
  return createFileRegistry(msg);
}

export async function protoFileToBin<S extends MessageSchema>(
  payload: ProtoFile,
  schema: S,
  registry?: Registry,
): Promise<Uint8Array> {
  const msg = await loadMessage(payload, schema, registry);
  return toBinary(schema, msg);
}

export async function protoFileToJson<S extends MessageSchema>(
  payload: ProtoFile,
  schema: S,
  registry?: Registry,
): Promise<string> {
  const msg = await loadMessage(payload, schema, registry);
  return toJsonString(schema, msg, { registry, prettySpaces: 2 });
}
