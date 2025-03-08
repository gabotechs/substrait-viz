import React, { HTMLProps } from 'react';
import { useTheme } from '../theme.ts';

export interface TagProps extends HTMLProps<HTMLDivElement> {
  type: string;
}

export function Tag({ type, className = '', style, ...rest }: TagProps) {
  const { boxBackground } = useTheme();

  const cleanType = React.useMemo(() => type.split('.').slice(-1)[0], [type]);

  return (
    <div
      className={`${className} absolute -top-2.5 px-2 w-fit`}
      style={{ background: boxBackground, ...style }}
      {...rest}
    >
      {cleanType}
    </div>
  );
}
