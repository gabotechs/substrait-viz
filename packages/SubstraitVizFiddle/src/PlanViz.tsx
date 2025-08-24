import { CancelButton } from './CancelButton.tsx';
import { SubstraitViz } from '@substrait-viz/react';
import React from 'react';
import { DroppedFile, useFileDrop } from './useFileDrop.ts';
import { THEME } from './theme.ts';

export interface PlanVizProps {
  plan: DroppedFile;
  setPlan: React.Dispatch<React.SetStateAction<DroppedFile | undefined>>;
  descriptors: DroppedFile[] | undefined;
  isDarkMode: boolean;
}
export function PlanViz({
  plan,
  setPlan,
  descriptors,
  isDarkMode,
}: PlanVizProps) {
  const theme = THEME[isDarkMode ? 'dark' : 'light'];

  const protoDescriptorSets = React.useMemo(
    () => descriptors?.map(_ => _.value),
    [descriptors],
  );

  const {
    handleDragOver,
    handleDragLeave,
    handleDrop,
    fileInputRef,
    handleFileSelect,
  } = useFileDrop(setPlan);

  return (
    <>
      <div className={'absolute top-4 right-4 flex gap-1 flex-row z-10 '}>
        <span>{plan.name}</span>
        <CancelButton onClick={() => setPlan(undefined)} />
      </div>

      <div className={'absolute top-4 left-4 flex gap-1 flex-row z-10 '}>
        {descriptors?.map((_, i) => <span key={i}>{_.name}</span>)}
      </div>

      <SubstraitViz
        plan={plan.value}
        theme={theme}
        colorMode={isDarkMode ? 'dark' : 'light'}
        protoDescriptorSets={protoDescriptorSets}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      />

      <input
        className={'hidden'}
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
    </>
  );
}
