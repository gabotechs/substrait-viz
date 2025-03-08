import { HTMLProps } from 'react';

export interface StringListProps extends HTMLProps<HTMLDivElement> {
  entries: string[];
}

export function StringList({
  entries,
  className = '',
  ...rest
}: StringListProps) {
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
