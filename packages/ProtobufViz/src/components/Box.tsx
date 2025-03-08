import React from 'react';

import { useTheme } from '../theme.ts';
import { Tag } from './Tag.tsx';

export function Box({
  children,
  tag,
}: React.PropsWithChildren<{ tag: string; node?: Record<string, unknown> }>) {
  const { boxBorder, boxBackground } = useTheme();
  return (
    <div
      className={`px-4 py-2 gap-2 flex flex-col rounded-md border-2 relative`}
      style={{ borderColor: boxBorder, backgroundColor: boxBackground }}
    >
      <Tag type={tag} />
      <div className="h-3" />
      {children}
    </div>
  );
}
