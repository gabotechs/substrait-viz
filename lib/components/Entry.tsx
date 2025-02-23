import { HTMLProps } from 'react';

export interface EntryProps
  extends React.PropsWithChildren<HTMLProps<HTMLDivElement>> {
  name: string;
}

export function Entry(props: EntryProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-bold">{props.name}: </span>
      <div className="flex flex-col ml-2">{props.children}</div>
    </div>
  );
}
