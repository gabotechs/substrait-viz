import { HTMLProps } from 'react';
import { String } from './String.tsx';

export interface StringListProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onChange'> {
  entries: string[];
  onChange?: (value: string[]) => void;
}

export function StringList({
  entries,
  onChange,
  className = '',
  ...rest
}: StringListProps) {
  return (
    <div
      className={`${className} flex flex-col gap-2 whitespace-nowrap`}
      {...rest}
    >
      {entries.map((name, i) => (
        <String
          key={i}
          value={name}
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
