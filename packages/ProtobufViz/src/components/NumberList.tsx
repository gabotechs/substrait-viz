import { HTMLProps } from 'react';

export interface NumberListProps extends HTMLProps<HTMLDivElement> {
  entries: number[];
}

export function NumberList({
  entries,
  className = '',
  ...rest
}: NumberListProps) {
  return (
    <div
      className={`${className} flex flex-col gap-2 whitespace-nowrap`}
      {...rest}
    >
      {entries.map((name, i) => (
        <span key={i}>{name}</span>
      ))}
    </div>
  );
}
