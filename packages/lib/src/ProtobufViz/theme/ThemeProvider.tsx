import React from 'react';
import { defaultTheme, ProtobufVizTheme } from './ProtobufVizTheme.ts';
import { ThemeContext } from './ThemeContext.tsx';

export const ThemeProvider = (
  props: React.PropsWithChildren<{ theme?: Partial<ProtobufVizTheme> }>,
) => {
  const theme = React.useMemo(
    () => ({ ...defaultTheme, ...props.theme }),
    [props.theme],
  );
  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};
