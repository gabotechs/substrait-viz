import { FileCard } from './FileCard.tsx';
import { FileCardAdd } from './FileCardAdd.tsx';
import React from 'react';
import { DroppedFile, useFileDrop } from './useFileDrop.ts';
import { THEME } from './theme.ts';

export interface PlanDropProps {
  setPlan: React.Dispatch<React.SetStateAction<DroppedFile | undefined>>;
  descriptors: DroppedFile[] | undefined;
  setDescriptors: React.Dispatch<
    React.SetStateAction<DroppedFile[] | undefined>
  >;
  isDarkMode: boolean;
}

export function PlanDrop({
  setPlan,
  descriptors,
  setDescriptors,
  isDarkMode,
}: PlanDropProps) {
  const theme = THEME[isDarkMode ? 'dark' : 'light'];

  const {
    isDragging,
    fileInputRef,
    handleFileSelect,
    triggerFileInput,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useFileDrop(setPlan);

  return (
    <div
      className="w-screen h-screen relative flex justify-center items-center"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {' '}
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
    </div>
  );
}
