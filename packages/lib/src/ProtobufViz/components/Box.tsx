import React from 'react';

import { Tag } from './Tag.tsx';
import { HEIGHT_ATTRIBUTE, WIDTH_ATTRIBUTE } from '../compile.ts';
import { useTheme } from '../theme.ts';

export function Box({
  children,
  node,
  tag,
}: React.PropsWithChildren<{ tag: string; node: Record<string, unknown> }>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { boxBorder, boxBackground } = useTheme();
  React.useLayoutEffect(() => {
    if (ref.current) {
      // This will inject the __height and __width attributes into the React Flow
      // nodes so that the autolayout function can know about the dimensions of
      // each node.
      node[WIDTH_ATTRIBUTE] = ref.current.clientWidth;
      node[HEIGHT_ATTRIBUTE] = ref.current.clientHeight;
    }
  }, [node]);

  return (
    <div
      ref={ref}
      className={`px-4 py-2 shadow-md rounded-md flex-col border-2 overflow-auto`}
      style={{ borderColor: boxBorder, backgroundColor: boxBackground }}
    >
      <Tag type={tag} />
      <div className="h-2" />
      {children}
    </div>
  );
}
