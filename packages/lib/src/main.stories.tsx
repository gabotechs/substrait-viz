import type { Meta, StoryObj } from '@storybook/react';
import { fromJsonString } from '@bufbuild/protobuf';

import { CONFIG } from './config.ts';
import { PlanSchema } from './gen/substrait/plan_pb.ts';
import { ProtobufViz } from './ProtobufViz/ProtobufViz.tsx';
import plan1 from './.test_data/plan1.json?raw';
import plan2 from './.test_data/plan2.json?raw';

function FullScreenPlan(props: { plan: string }) {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ProtobufViz
        config={CONFIG}
        rootNode={fromJsonString(PlanSchema, props.plan)}
      />
    </div>
  );
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'SubstraitViz',
  component: FullScreenPlan,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof FullScreenPlan>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Plan1: Story = {
  args: { plan: plan1 },
};

export const Plan2: Story = {
  args: { plan: plan2 },
};
