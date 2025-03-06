import { createFileRegistry, fromBinary, Registry } from '@bufbuild/protobuf';
import { FileDescriptorSetSchema } from '@bufbuild/protobuf/wkt';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProtobufViz } from './ProtobufViz.tsx';

import perfPayload from './.test_data/perf-payload.bin?base64';
import perfBinPb from './.test_data/perf.binpb?base64';

function FullScreenPlan(props: { bin: string; payload: string }) {
  const [msg, msgSchema] = React.useMemo(() => {
    const bin = base64ToUint8Array(props.bin);
    const payload = base64ToUint8Array(props.payload);
    const fileDescriptorSet = fromBinary(FileDescriptorSetSchema, bin);

    const registry = createFileRegistry(fileDescriptorSet);

    const msgSchema = findMessage(registry) ?? bail();
    const msg = fromBinary(msgSchema, payload);
    return [msg, msgSchema];
  }, [props.bin, props.payload]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ProtobufViz config={{ nodes: [msgSchema] }} rootNode={msg} />
    </div>
  );
}

const meta = {
  title: 'ProtobufViz',
  component: FullScreenPlan,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FullScreenPlan>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pef: Story = {
  args: {
    bin: perfBinPb,
    payload: perfPayload,
  },
};

function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  return new Uint8Array([...binaryString].map(c => c.charCodeAt(0)));
}

function findMessage(registry: Registry) {
  for (const msg of registry) {
    if (msg.kind == 'message') return msg;
  }
}

function bail(): never {
  throw new Error('Unreachable');
}
