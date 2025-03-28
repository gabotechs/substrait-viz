import React, { HTMLProps } from 'react';
import { useTheme } from '../theme.ts';

export interface ExpandableProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onClick' | 'type'> {
  children: React.ReactNode;
  isExpandable: boolean;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Expandable = React.forwardRef<HTMLDivElement, ExpandableProps>(
  (
    { expanded, isExpandable, children, setExpanded, className = '', ...props },
    ref,
  ) => {
    const [hoverDiv, setHoverDiv] = React.useState(false);
    const [hoverButton, setHoverButton] = React.useState(false);
    const hover = hoverDiv || hoverButton;
    const { background } = useTheme();

    return (
      <div
        className={`${className} relative`}
        onMouseEnter={() => setHoverDiv(true)}
        onMouseLeave={() => setHoverDiv(false)}
        ref={ref}
        {...props}
      >
        <div
          className={`absolute top-0 cursor-pointer z-20 bg-transparent flex justify-end`}
          style={{
            opacity: !hover ? 0 : undefined,
            width: 'calc(100% + 16px)',
          }}
          onMouseEnter={() => setHoverButton(true)}
          onMouseLeave={() => setHoverButton(false)}
          hidden={!isExpandable}
          onClick={() => setExpanded(p => !p)}
        >
          <div className={'px-1'} style={{ background }}>
            {expanded ? (
              <span className={'i-mdi-arrow-collapse'} />
            ) : (
              <span className={'i-mdi-arrow-expand'} />
            )}
          </div>
        </div>
        {children}
      </div>
    );
  },
);
