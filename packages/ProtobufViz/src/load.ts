import {
  createFileRegistry,
  FileRegistry,
  fromBinary,
  fromJson,
  MessageShape,
} from '@bufbuild/protobuf';
import { FileDescriptorSetSchema } from '@bufbuild/protobuf/wkt';
import { MessageSchema } from './compile.ts';
import { fetchFile, Json, ProtoFile } from './file.ts';

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
 * @param protoDescriptorSets optional set of proto descriptors for
 *  decoding unknown Any messages.
 */
export async function loadMessage<S extends MessageSchema>(
  payload: ProtoFile,
  schema: S,
  protoDescriptorSets?: ProtoFile[],
): Promise<MessageShape<S>> {
  let registry;

  if (protoDescriptorSets && protoDescriptorSets.length > 0) {
    registry = createFileRegistry(
      ...(await Promise.all(protoDescriptorSets.map(buildRegistry))),
    );
  }

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
