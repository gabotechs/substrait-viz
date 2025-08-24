import { FileCard } from './FileCard.tsx';
import { FileCardAdd } from './FileCardAdd.tsx';
import React from 'react';
import { DroppedFile, useFileDrop } from './useFileDrop.ts';
import { THEME } from './theme.ts';
import { ThemeToggleButton } from './ThemeToggleButton.tsx';
import { useThemeMode } from './ThemeModeContext.tsx';

export interface PlanDropProps {
  setPlan: React.Dispatch<React.SetStateAction<DroppedFile | undefined>>;
  descriptors: DroppedFile[] | undefined;
  setDescriptors: React.Dispatch<
    React.SetStateAction<DroppedFile[] | undefined>
  >;
}

export function PlanDrop({
  setPlan,
  descriptors,
  setDescriptors,
}: PlanDropProps) {
  const { isDarkMode } = useThemeMode();
  const theme = THEME[isDarkMode ? 'dark' : 'light'];

  const {
    dragState,
    error,
    fileName,
    fileInputRef,
    handleFileSelect,
    triggerFileInput,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useFileDrop(setPlan);

  const getDragMessage = () => {
    switch (dragState) {
      case 'dragging':
        return fileName
          ? `Drop "${fileName}" to visualize`
          : 'Drop to visualize plan';
      case 'processing':
        return fileName ? `Processing "${fileName}"...` : 'Processing file...';
      case 'success':
        return fileName
          ? `"${fileName}" loaded successfully!`
          : 'File loaded successfully!';
      case 'error':
        return error?.message || 'Error loading file';
      default:
        return 'Drop your Substrait plan here';
    }
  };

  const getMessageColor = () => {
    switch (dragState) {
      case 'dragging':
        return isDarkMode ? 'text-blue-300' : 'text-blue-600';
      case 'processing':
        return isDarkMode ? 'text-yellow-300' : 'text-yellow-600';
      case 'success':
        return isDarkMode ? 'text-green-300' : 'text-green-600';
      case 'error':
        return isDarkMode ? 'text-red-300' : 'text-red-600';
      default:
        return isDarkMode ? 'text-gray-300' : 'text-gray-700';
    }
  };

  return (
    <div className="w-screen h-screen relative flex justify-center items-center">
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggleButton />
      </div>
      <div
        className={
          'absolute top-8 right-4 left-4 flex gap-2 flex-row justify-center z-10'
        }
      >
        {descriptors?.map((_, i) => (
          <FileCard
            className={'h-32 w-80'}
            key={i}
            name={_.name}
            help={_.help || ''}
            theme={theme}
            setHelp={newHelp =>
              setDescriptors(prev =>
                prev?.map((desc, index) =>
                  index === i ? { ...desc, help: newHelp } : desc,
                ),
              )
            }
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
        className={`absolute h-[40%] w-screen flex flex-col justify-center items-center text-lg font-bold cursor-pointer transition-colors duration-200 ${getMessageColor()}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <div className="text-center px-4">{getDragMessage()}</div>
        {dragState === 'processing' && (
          <div className="mt-2 text-sm opacity-75">
            <div className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
            Please wait...
          </div>
        )}
        {dragState === 'idle' && (
          <div className="mt-2 text-sm opacity-60">or click to browse</div>
        )}
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
