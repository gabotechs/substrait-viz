import { HTMLProps } from 'react';
import { Number } from './Number.tsx';

export interface NumberListProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onChange'> {
  entries: number[];
  onChange?: (value: number[]) => void;
}

export function NumberList({
  entries,
  onChange,
  className = '',
  ...rest
}: NumberListProps) {
  return (
    <div
      className={`${className} flex flex-col gap-2 whitespace-nowrap`}
      {...rest}
    >
      {entries.map((value, i) => (
        <Number
          key={i}
          value={value}
          onChange={v => {
            const newEntries = [...entries];
            newEntries[i] = v;
            onChange?.(newEntries);
          }}
        />
      ))}
    </div>
  );
}
