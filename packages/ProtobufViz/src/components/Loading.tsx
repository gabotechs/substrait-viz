import { ReactFlow } from '@xyflow/react';
import { ProtobufVizTheme } from '../theme.ts';
import { Background } from './Background.tsx';

export function Loading({ theme }: { theme: ProtobufVizTheme }) {
  return (
    <ReactFlow>
      <div className={'w-full h-full flex items-center justify-center'}>
        Loading...
      </div>
      <Background theme={theme} />
    </ReactFlow>
  );
}
