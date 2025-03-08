import React, { HTMLProps } from 'react';

export interface EntryProps
  extends React.PropsWithChildren<HTMLProps<HTMLDivElement>> {
  name: string;
}

export function Entry({ name, children, className = '', ...rest }: EntryProps) {
  return (
    <div className={`${className} flex flex-row gap-1`} {...rest}>
      <span className="font-bold">{name}: </span>
      <div className="flex flex-col ml-2">{children}</div>
    </div>
  );
}
