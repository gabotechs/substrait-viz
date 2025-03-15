import React from 'react';

import { useTheme } from '../theme.ts';

export function Box({
  children,
  tag,
}: React.PropsWithChildren<{ tag: string }>) {
  const { boxBorder, boxBackground } = useTheme();
  return (
    <div
      className={`px-4 py-2 gap-2 flex flex-col rounded-md border-2 relative`}
      style={{ borderColor: boxBorder, backgroundColor: boxBackground }}
    >
      <div
        className={`relative -top-4.5 px-2 w-fit whitespace-nowrap -mb-4.5`}
        style={{ background: boxBackground }}
      >
        {tag}
      </div>
      {children}
    </div>
  );
}
