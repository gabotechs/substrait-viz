import { ReactFlow } from '@xyflow/react';
import { ProtobufVizTheme } from '../theme.ts';
import { Background } from './Background.tsx';

export function LoadingError({
  theme,
  error,
}: {
  theme: ProtobufVizTheme;
  error: Error;
}) {
  return (
    <ReactFlow>
      {error && (
        <div
          className={
            'w-full h-full text-center p-10 flex items-center justify-center'
          }
        >
          <span className={'text-red-400'}>{error.message}</span>
        </div>
      )}
      <Background theme={theme} />
    </ReactFlow>
  );
}
