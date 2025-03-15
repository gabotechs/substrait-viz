import React, { HTMLProps } from 'react';

export interface ExpandableProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onClick' | 'type'> {
  children: React.ReactNode;
  isExpandable: boolean;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Expandable({
  expanded,
  isExpandable,
  children,
  setExpanded,
  className = '',
  ...props
}: ExpandableProps) {
  const [hoverDiv, setHoverDiv] = React.useState(false);
  const [hoverButton, setHoverButton] = React.useState(false);
  const hover = hoverDiv || hoverButton;

  return (
    <div
      className={`${className} relative`}
      onMouseEnter={() => setHoverDiv(true)}
      onMouseLeave={() => setHoverDiv(false)}
      {...props}
    >
      <button
        onMouseEnter={() => setHoverButton(true)}
        onMouseLeave={() => setHoverButton(false)}
        hidden={!isExpandable}
        style={{ opacity: !hover ? 0 : undefined }}
        className={`absolute top-0 -right-4 cursor-pointer z-20`}
        onClick={() => setExpanded(p => !p)}
        type={'button'}
      >
        {expanded ? (
          <span className={'i-mdi-arrow-collapse'} />
        ) : (
          <span className={'i-mdi-arrow-expand'} />
        )}
      </button>
      {children}
    </div>
  );
}
