import { HTMLProps } from 'react';
import { AggregateRel_Grouping } from '../gen/substrait/algebra_pb';
import { serializeExpression } from './serializeExpression';

export interface GroupingVizProps extends HTMLProps<HTMLDivElement> {
  grouping: AggregateRel_Grouping;
}

export function GroupingViz({
  grouping,
  className = '',
  ...rest
}: GroupingVizProps) {
  return (
    <div className={`${className} flex flex-col`} {...rest}>
      {grouping.groupingExpressions.map((expr, i) => (
        <span key={i}>{serializeExpression(expr)}</span>
      ))}
    </div>
  );
}
