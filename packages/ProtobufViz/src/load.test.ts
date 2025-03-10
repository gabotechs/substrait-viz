import { toBinary, toJson } from '@bufbuild/protobuf';
import { describe, expect, test } from 'vitest';
import { ExtraSchema } from './.test_data/gen/extra_pb.ts';
import { Foo, FooSchema } from './.test_data/gen/spec_pb.ts';
import specBinPb from './.test_data/spec.binpb?bin';
import { buildRegistry, loadMessage, loadRegistry } from './load.ts';

describe('loadNode', () => {
  const testData: Foo = {
    $typeName: 'spec.Foo',
    name: 'main',
    bar: {
      $typeName: 'spec.Bar',
      foos: [
        { $typeName: 'spec.Foo', name: '1' },
        { $typeName: 'spec.Foo', name: '2' },
        { $typeName: 'spec.Foo', name: '3' },
        { $typeName: 'spec.Foo', name: '4' },
      ],
    },
  };

  function assert(node: Foo) {
    expect(node.name).to.equal('main');
    expect(node.bar?.foos[0].name).to.equal('1');
    expect(node.bar?.foos[1].name).to.equal('2');
    expect(node.bar?.foos[2].name).to.equal('3');
    expect(node.bar?.foos[3].name).to.equal('4');
  }

  test('simple node from JSON', async () => {
    const node = await loadMessage(
      JSON.stringify(toJson(FooSchema, testData)),
      FooSchema,
    );
    assert(node);
  });

  test('simple node from binary', async () => {
    const node = await loadMessage(toBinary(FooSchema, testData), FooSchema);
    assert(node);
  });

  test('simple node from base64', async () => {
    const bin = toBinary(FooSchema, testData);
    const node = await loadMessage(uint8ArrayToBase64(bin), FooSchema);
    assert(node);
  });

  test('simple node from binary Url', async () => {
    const url = URL.createObjectURL(new Blob([toBinary(FooSchema, testData)]));
    const node = await loadMessage(url, FooSchema);
    assert(node);
  });

  const testDataWithAny: Foo = {
    $typeName: 'spec.Foo',
    name: 'main',
    bar: {
      $typeName: 'spec.Bar',
      foos: [
        {
          $typeName: 'spec.Foo',
          name: '1',
          any: {
            $typeName: 'google.protobuf.Any',
            typeUrl: 'extra.Extra',
            value: toBinary(ExtraSchema, {
              $typeName: 'extra.Extra',
              int: 1,
            }),
          },
        },
      ],
    },
  };

  function assertWithAny(node: Foo) {
    expect(node.name).to.equal('main');
    expect(node.bar?.foos[0].name).to.equal('1');
    expect(node.bar?.foos[0].any?.value.length).to.gt(1);
  }

  test('simple node from JSON with registry', async () => {
    const registry = await buildRegistry(specBinPb);
    const node = await loadMessage(
      JSON.stringify(toJson(FooSchema, testDataWithAny, { registry })),
      FooSchema,
      await loadRegistry([specBinPb]),
    );
    assertWithAny(node);
  });

  test('simple node from JSON (no descriptor) with registry', async () => {
    const registry = await buildRegistry(specBinPb);
    const promise = loadMessage(
      JSON.stringify(toJson(FooSchema, testDataWithAny, { registry })),
      FooSchema,
    );
    await expect(promise).rejects.toThrow();
  });

  test('simple node from binary with registry', async () => {
    const node = await loadMessage(
      toBinary(FooSchema, testDataWithAny),
      FooSchema,
    );
    assertWithAny(node);
  });

  test('simple node from base64 with registry', async () => {
    const bin = toBinary(FooSchema, testDataWithAny);
    const node = await loadMessage(uint8ArrayToBase64(bin), FooSchema);
    assertWithAny(node);
  });

  test('simple node from binary Url with registry', async () => {
    const url = URL.createObjectURL(
      new Blob([toBinary(FooSchema, testDataWithAny)]),
    );
    const node = await loadMessage(url, FooSchema);
    assertWithAny(node);
  });
});

// Helper function to convert Uint8Array to a Base64 string
function uint8ArrayToBase64(uint8Array: Uint8Array): string {
  return btoa(String.fromCharCode(...uint8Array));
}
