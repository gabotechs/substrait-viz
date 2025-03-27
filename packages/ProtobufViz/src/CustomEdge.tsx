import {
  BaseEdge,
  type Edge,
  EdgeLabelRenderer,
  type EdgeProps,
  getBezierPath,
} from '@xyflow/react';
import React, { type FC } from 'react';
import { useTheme } from './theme.ts';

export const CustomEdge: FC<EdgeProps<Edge<{ label: string }>>> = React.memo(
  ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    label,
    markerEnd,
    markerStart,
    interactionWidth,
  }) => {
    const theme = useTheme();
    const [path, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });

    return (
      <>
        <BaseEdge
          style={{ stroke: theme.lineColor }}
          id={id}
          path={path}
          markerEnd={markerEnd}
          markerStart={markerStart}
          interactionWidth={interactionWidth}
        />
        <EdgeLabelRenderer>
          <div
            className={'absolute text-sm z-[100000] p-1 rounded-sm'}
            style={{
              background: theme.boxBackground,
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              color: theme.textColor,
            }}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      </>
    );
  },
);
