import { HTMLProps } from 'react';
import { DroppedFile, useFileDrop } from './useFileDrop.ts';
import { SubstraitVizTheme } from '@substrait-viz/react';

export interface FileCardAddProps extends HTMLProps<HTMLDivElement> {
  label: string;
  theme: SubstraitVizTheme;
  onAdd: (file: DroppedFile) => void;
}

export function FileCardAdd({
  className = '',
  label,
  theme,
  onAdd,
  ...props
}: FileCardAddProps) {
  const {
    dragState,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    triggerFileInput,
    fileInputRef,
    handleFileSelect,
  } = useFileDrop(onAdd);

  return (
    <div
      className={`${className} flex justify-center items-center text-center rounded-md cursor-pointer`}
      style={{ borderColor: theme.textColor }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={triggerFileInput}
      {...props}
    >
      <input
        className={'hidden'}
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
      {dragState === 'dragging' ? (
        'Drop to add'
      ) : (
        <span>
          <span className={'text-xl font-light'}>+</span> {label}
        </span>
      )}
    </div>
  );
}
