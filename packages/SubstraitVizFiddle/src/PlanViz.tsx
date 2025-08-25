import { CancelButton } from './CancelButton.tsx';
import { SubstraitViz } from '@substrait-viz/react';
import React from 'react';
import { DroppedFile, useFileDrop } from './useFileDrop.ts';
import { THEME } from './theme.ts';
import { ShareButton } from './ShareButton.tsx';
import { ThemeToggleButton } from './ThemeToggleButton.tsx';
import { CopyAsJSONButton } from './CopyAsJSONButton.tsx';
import { useThemeMode } from './ThemeModeContext.tsx';
import { DownloadBinButton } from './DownloadBinButton.tsx';

export interface PlanVizProps {
  plan: DroppedFile;
  setPlan: React.Dispatch<React.SetStateAction<DroppedFile | undefined>>;
  descriptors: DroppedFile[] | undefined;
}
export function PlanViz({ plan, setPlan, descriptors }: PlanVizProps) {
  const { isDarkMode } = useThemeMode();
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
  } = useFileDrop(setPlan, true);

  return (
    <>
      <div
        className={
          'absolute top-2 right-4 flex gap-1 flex-row items-center z-10 '
        }
      >
        <ThemeToggleButton />
        <CopyAsJSONButton plan={plan} descriptors={descriptors} />
        <DownloadBinButton plan={plan} descriptors={descriptors} />
        <ShareButton />
        <span className="ml-2 relative bottom-[1px]">{plan.name}</span>
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
