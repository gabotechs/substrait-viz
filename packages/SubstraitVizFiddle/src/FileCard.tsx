import { HTMLProps } from 'react';
import { SubstraitVizTheme } from '@substrait-viz/react';
import { CancelButton } from './CancelButton.tsx';

export interface FileCardProps extends HTMLProps<HTMLDivElement> {
  fileName: string;
  theme: SubstraitVizTheme;
  onDelete: () => void;
}

export function FileCard({
  fileName,
  theme,
  className = '',
  onDelete,
  ...props
}: FileCardProps) {
  return (
    <div
      className={`${className} relative flex justify-center items-center text-center rounded-md border`}
      style={{ borderColor: theme.boxBorder }}
      {...props}
    >
      <CancelButton
        className={'absolute top-1 right-1'}
        onClick={() => onDelete()}
      />
      {fileName}
    </div>
  );
}
