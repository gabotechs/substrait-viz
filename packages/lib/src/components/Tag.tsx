import React from 'react';
import { HTMLProps } from 'react';
import { useTheme } from '../theme/useTheme';

export interface TagProps extends HTMLProps<HTMLDivElement> {
  type: string;
}

export function Tag({ type, className = '', style, ...rest }: TagProps) {
  const { background } = useTheme();

  const cleanType = React.useMemo(
    () =>
      type.startsWith('substrait.') ? type.slice('substrait.'.length) : type,
    [type],
  );

  return (
    <div
      className={`${className} absolute -top-2.5 px-2 w-fit`}
      style={{ background, ...style }}
      {...rest}
    >
      {cleanType}
    </div>
  );
}
