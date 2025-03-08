import { createFileRegistry, fromBinary, Registry } from '@bufbuild/protobuf';
import { FileDescriptorSetSchema } from '@bufbuild/protobuf/wkt';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProtobufViz } from './ProtobufViz.tsx';

import perfPayload from './.test_data/perf-payload.bin?base64';
import perfBinPb from './.test_data/perf.binpb?bin';

function FullScreenPlan(props: { bin: Uint8Array; payload: string }) {
  const msgSchema = React.useMemo(() => {
    const fileDescriptorSet = fromBinary(FileDescriptorSetSchema, props.bin);
    const registry = createFileRegistry(fileDescriptorSet);
    return findMessage(registry) ?? bail();
  }, [props.bin]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ProtobufViz
        coreNodes={[msgSchema]}
        protoMessage={props.payload}
        schema={msgSchema}
      />
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

export const Perf: Story = {
  args: {
    bin: perfBinPb,
    payload: perfPayload,
  },
};

export const ErrorLoading: Story = {
  args: {
    bin: perfBinPb,
    payload: 'asd',
  },
};

function findMessage(registry: Registry) {
  for (const msg of registry) {
    if (msg.kind == 'message') return msg;
  }
}

function bail(): never {
  throw new Error('Unreachable');
}
