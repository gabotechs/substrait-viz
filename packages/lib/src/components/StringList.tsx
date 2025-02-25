import { HTMLProps } from 'react';

export interface StringListProps extends HTMLProps<HTMLDivElement> {
  names: string[];
}

export function StringList({
  names,
  className = '',
  ...rest
}: StringListProps) {
  return (
    <div className={`${className} flex flex-col whitespace-nowrap`} {...rest}>
      {names.map((name, i) => (
        <span key={i}>- {name}</span>
      ))}
    </div>
  );
}
