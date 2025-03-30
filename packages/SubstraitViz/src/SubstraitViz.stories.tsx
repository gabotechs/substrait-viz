// noinspection JSUnusedGlobalSymbols
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import plan1 from './.test_data/plan1.json?raw';
import plan2 from './.test_data/plan2.json?raw';
import setComparisionAny from './.test_data/set-comparision-any.json?raw';
// taken from https://github.com/substrait-io/substrait-cpp/tree/1f82620f01c5235a47b5badeed9482bd632afc7a/src/substrait/textplan/data
import tpchPlan01 from './.test_data/tpch-plan01.json?raw';
import tpchPlan02 from './.test_data/tpch-plan02.json?raw';
import tpchPlan03 from './.test_data/tpch-plan03.json?raw';
import tpchPlan04 from './.test_data/tpch-plan04.json?raw';
import tpchPlan05 from './.test_data/tpch-plan05.json?raw';
import tpchPlan06 from './.test_data/tpch-plan06.json?raw';
import tpchPlan07 from './.test_data/tpch-plan07.json?raw';
import tpchPlan09 from './.test_data/tpch-plan09.json?raw';
import tpchPlan10 from './.test_data/tpch-plan10.json?raw';
import tpchPlan11 from './.test_data/tpch-plan11.json?raw';
import tpchPlan13 from './.test_data/tpch-plan13.json?raw';
import tpchPlan14 from './.test_data/tpch-plan14.json?raw';
import tpchPlan16 from './.test_data/tpch-plan16.json?raw';
import tpchPlan17 from './.test_data/tpch-plan17.json?raw';
import tpchPlan18 from './.test_data/tpch-plan18.json?raw';
import tpchPlan19 from './.test_data/tpch-plan19.json?raw';
import tpchPlan20 from './.test_data/tpch-plan20.json?raw';
import tpchPlan21 from './.test_data/tpch-plan21.json?raw';
import tpchPlan22 from './.test_data/tpch-plan22.json?raw';
import { SubstraitViz, SubstraitVizProps } from './SubstraitViz.tsx';

function FileDropPlan(props: SubstraitVizProps) {
  const [plan, setPlan] = React.useState(props.plan);

  const { handleDragOver, handleDragLeave, handleDrop } = useFileDrop(setPlan);
  return (
    <div className={'h-screen w-screen'}>
      <SubstraitViz
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        {...props}
        plan={plan}
      />
    </div>
  );
}

const meta = {
  title: 'SubstraitViz',
  component: FileDropPlan,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FileDropPlan>;

export default meta;
type Story = StoryObj<typeof meta>;

const darkTheme: SubstraitVizProps['theme'] = {
  textColor: '#fff',
  background: '#222',
  boxBackground: '#2a2a2a',
  lineColor: '#888',
};

export const Plan1: Story = { args: { plan: plan1 } };
export const Plan1Dark: Story = {
  args: { plan: plan1, theme: darkTheme, colorMode: 'dark' },
};
export const Plan2: Story = { args: { plan: plan2 } };
export const Plan2Dark: Story = {
  args: { plan: plan2, theme: darkTheme, colorMode: 'dark' },
};
export const SetComparisionAny: Story = { args: { plan: setComparisionAny } };
export const TpchPlan01: Story = { args: { plan: tpchPlan01 } };
export const TpchPlan02: Story = { args: { plan: tpchPlan02 } };
export const TpchPlan03: Story = { args: { plan: tpchPlan03 } };
export const TpchPlan04: Story = { args: { plan: tpchPlan04 } };
export const TpchPlan05: Story = { args: { plan: tpchPlan05 } };
export const TpchPlan06: Story = { args: { plan: tpchPlan06 } };
export const TpchPlan07: Story = { args: { plan: tpchPlan07 } };
export const TpchPlan09: Story = { args: { plan: tpchPlan09 } };
export const TpchPlan10: Story = { args: { plan: tpchPlan10 } };
export const TpchPlan11: Story = { args: { plan: tpchPlan11 } };
export const TpchPlan13: Story = { args: { plan: tpchPlan13 } };
export const TpchPlan14: Story = { args: { plan: tpchPlan14 } };
export const TpchPlan16: Story = { args: { plan: tpchPlan16 } };
export const TpchPlan17: Story = { args: { plan: tpchPlan17 } };
export const TpchPlan18: Story = { args: { plan: tpchPlan18 } };
export const TpchPlan19: Story = { args: { plan: tpchPlan19 } };
export const TpchPlan20: Story = { args: { plan: tpchPlan20 } };
export const TpchPlan21: Story = { args: { plan: tpchPlan21 } };
export const TpchPlan22: Story = { args: { plan: tpchPlan22 } };

function useFileDrop(setPlan: (value: string) => void) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const match = result.match(/^data:(.*?);base64,(.*)$/);

        if (!match) {
          setError(new Error('Invalid file format'));
          return;
        }
        const mimeType = match[1];
        const base64 = match[2];

        if (mimeType === 'application/json') {
          try {
            const decoded = atob(base64);
            JSON.parse(decoded); // Validate it's JSON
            setPlan(decoded);
            return;
          } catch {
            // this is fine, we'll fall back to base64.
          }
        }

        setPlan(base64);
      };
      reader.onerror = () => setError(new Error('Error loading file'));
      reader.readAsDataURL(file);
    }
  };

  return { isDragging, error, handleDragOver, handleDragLeave, handleDrop };
}
