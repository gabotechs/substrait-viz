import { Background as _Background, BackgroundVariant } from '@xyflow/react';
import { ProtobufVizTheme } from '../theme.ts';

export function Background({ theme }: { theme: ProtobufVizTheme }) {
  return (
    <_Background
      variant={BackgroundVariant.Dots}
      gap={12}
      size={1}
      bgColor={theme.background}
    />
  );
}
