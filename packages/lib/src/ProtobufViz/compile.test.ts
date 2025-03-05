import { describe, expect, test } from 'vitest';
import {
  createFileRegistry,
  fromBinary,
  Message,
  Registry,
} from '@bufbuild/protobuf';
import { FileDescriptorSetSchema } from '@bufbuild/protobuf/wkt';
import { Compiler } from './compile.ts';
import perfBinPb from './.test_data/perf.binpb?base64';
import perfPayload from './.test_data/perf-payload.bin?base64';
import { GenMessage } from '@bufbuild/protobuf/codegenv1';

describe('compile', () => {
  test('perf.proto', async () => {
    const protoFile = base64ToUint8Array(perfBinPb);
    const protoPayload = base64ToUint8Array(perfPayload);

    const fileDescriptorSet = fromBinary(FileDescriptorSetSchema, protoFile);

    const registry = createFileRegistry(fileDescriptorSet);

    const mainMsg = findMessage(registry) ?? bail();
    const msg = fromBinary(mainMsg, protoPayload);
    const compiler = Compiler.fromCfg({
      nodes: [mainMsg],
    });
    const [nodes, edges] = compiler.compile(msg);
    expect(nodes.length).to.equal(18);
    expect(edges.length).to.equal(17);
  });
});

function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  return new Uint8Array([...binaryString].map(c => c.charCodeAt(0)));
}

function findMessage(registry: Registry) {
  for (const msg of registry) {
    if (msg.kind == 'message') return msg as GenMessage<Message>;
  }
}

function bail(): never {
  throw new Error('Unreachable');
}
