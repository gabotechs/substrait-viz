import {
  defaultTheme,
  SubstraitViz,
  SubstraitVizTheme,
} from '@substrait-viz/react';
import useLocalStorageState from 'use-local-storage-state';
import { CancelButton } from './CancelButton.tsx';
import { DroppedFile, useFileDrop } from './useFileDrop.ts';
import { useDarkMode } from './useDarkMode.ts';
import { FileCard } from './FileCard.tsx';
import { FileCardAdd } from './FileCardAdd.tsx';

const THEME = {
  dark: {
    ...defaultTheme,
    textColor: '#fff',
    background: '#222',
    boxBackground: '#2a2a2a',
    lineColor: '#888',
  } satisfies SubstraitVizTheme,
  light: {
    ...defaultTheme,
  } satisfies SubstraitVizTheme,
};

export function Fiddle() {
  const [plan, setPlan] = useLocalStorageState<DroppedFile>('plan-v2');
  const isDarkMode = useDarkMode();
  const [descriptors, setDescriptors] =
    useLocalStorageState<DroppedFile[]>('descriptors');

  const theme = THEME[isDarkMode ? 'dark' : 'light'];

  const {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    fileInputRef,
    handleFileSelect,
    triggerFileInput,
  } = useFileDrop(setPlan);

  return (
    <div
      className="w-screen h-screen relative flex justify-center items-center"
      style={{ background: theme.background, color: theme.textColor }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {!plan && (
        <>
          <div
            className={
              'absolute top-[8%] right-4 left-4 flex gap-2 flex-row justify-center z-10'
            }
          >
            {descriptors?.map((_, i) => (
              <FileCard
                className={'h-32 w-64'}
                key={i}
                fileName={_.name}
                theme={theme}
                onDelete={() =>
                  setDescriptors(prev => prev?.filter((_, ind) => ind !== i))
                }
              />
            ))}
            <FileCardAdd
              className={'h-32 w-64 border'}
              label={'Add proto descriptor set'}
              theme={theme}
              onAdd={file => setDescriptors(prev => (prev ?? []).concat(file))}
            />
          </div>

          <div
            className="absolute h-32 w-96 flex justify-center items-center text-lg font-bold cursor-pointer"
            onClick={triggerFileInput}
          >
            {isDragging
              ? 'Drop to visualize plan'
              : 'Drop your Substrait plan here'}
          </div>

          <input
            className={'hidden'}
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
        </>
      )}

      {plan && (
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
            protoDescriptorSets={descriptors?.map(_ => _.value)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
        </>
      )}
    </div>
  );
}
