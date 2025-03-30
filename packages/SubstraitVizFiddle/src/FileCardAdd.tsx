import { HTMLProps } from 'react';
import { useFileDrop } from './useFileDrop.ts';
import { SubstraitVizTheme } from '@substrait-viz/react';

interface DescriptorFile {
  name: string;
  value: string;
}

export interface FileCardAddProps extends HTMLProps<HTMLDivElement> {
  label: string;
  theme: SubstraitVizTheme;
  onAdd: (file: DescriptorFile) => void;
}

export function FileCardAdd({
  className = '',
  label,
  theme,
  onAdd,
  ...props
}: FileCardAddProps) {
  const {
    isDragging,
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
      {isDragging ? (
        'Drop to add'
      ) : (
        <span>
          <span className={'text-xl font-light'}>+</span> {label}
        </span>
      )}
    </div>
  );
}
