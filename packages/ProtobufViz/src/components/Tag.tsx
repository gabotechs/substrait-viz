import { HTMLProps } from 'react';
import { useTheme } from '../theme.ts';

export interface TagProps extends HTMLProps<HTMLDivElement> {
  tag: string;
}

export function Tag({ tag, className = '', style, ...rest }: TagProps) {
  const { boxBackground } = useTheme();

  return (
    <div
      className={`${className} relative -top-2.5 px-2 w-fit whitespace-nowrap`}
      style={{ background: boxBackground, ...style }}
      {...rest}
    >
      {tag}
    </div>
  );
}
