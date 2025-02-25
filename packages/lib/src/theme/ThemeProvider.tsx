import React from 'react';
import { defaultTheme, SubstraitVizTheme } from './SubstraitVizTheme';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = (
  props: React.PropsWithChildren<{ theme?: Partial<SubstraitVizTheme> }>,
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
