import {
  createFileRegistry,
  FileRegistry,
  fromBinary,
} from '@bufbuild/protobuf';
import { FileDescriptorSetSchema } from '@bufbuild/protobuf/wkt';
import { describe, expect, test } from 'vitest';
import testDescriptorBin from '../.test_data/perf.binpb?bin';
import badTestDescriptorBin from '../.test_data/plan1.json?bin';
import { fetchFile, Json, ProtoFile } from './file.ts';

describe('descriptor (positive cases)', () => {
  test('from url string', async () => {
    const objUrl = URL.createObjectURL(new Blob([testDescriptorBin]));
    const result = await buildRegistry(objUrl);
    const files = [...result.files];
    expect(files.length).to.equal(1);
    expect(files[0].messages.length).to.equal(1);
  });

  test('from url literal', async () => {
    const objUrl = URL.createObjectURL(new Blob([testDescriptorBin]));
    const result = await buildRegistry(new URL(objUrl));
    const files = [...result.files];
    expect(files.length).to.equal(1);
    expect(files[0].messages.length).to.equal(1);
  });

  test('from base64 string', async () => {
    const base64String = uint8ArrayToBase64(testDescriptorBin);
    const decodedBinary = Uint8Array.from(atob(base64String), c =>
      c.charCodeAt(0),
    );
    const result = await buildRegistry(decodedBinary);
    const files = [...result.files];
    expect(files.length).to.equal(1);
    expect(files[0].messages.length).to.equal(1);
  });

  test('from binary', async () => {
    const result = await buildRegistry(testDescriptorBin);
    const files = [...result.files];
    expect(files.length).to.equal(1);
    expect(files[0].messages.length).to.equal(1);
  });
});

describe('descriptor (negative cases)', () => {
  test('from bad URL', async () => {
    const fakeUrl = 'https://example.com/test-descriptor.bin';
    await expect(buildRegistry(fakeUrl)).rejects.toThrow();
  });

  test('from bad base64 string', async () => {
    const base64String = uint8ArrayToBase64(badTestDescriptorBin);
    const decodedBinary = Uint8Array.from(atob(base64String), c =>
      c.charCodeAt(0),
    );
    await expect(buildRegistry(decodedBinary)).rejects.toThrow();
  });

  test('from bad binary', async () => {
    await expect(buildRegistry(badTestDescriptorBin)).rejects.toThrow();
  });
});

// Helper function to convert Uint8Array to a Base64 string
function uint8ArrayToBase64(uint8Array: Uint8Array): string {
  return btoa(String.fromCharCode(...uint8Array));
}

async function buildRegistry(descriptor: ProtoFile): Promise<FileRegistry> {
  const bin = await fetchFile(descriptor);
  if (bin instanceof Json)
    throw new Error('JSON is not supported for a proto descriptor file');
  const msg = fromBinary(FileDescriptorSetSchema, bin);
  return createFileRegistry(msg);
}
