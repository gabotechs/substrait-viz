import { defaultTheme, SubstraitVizTheme } from '@substrait-viz/react';

export const THEME = {
  dark: {
    ...defaultTheme,
    textColor: '#fff',
    background: '#222',
    boxBackground: '#2a2a2a',
    lineColor: '#888',
  } satisfies SubstraitVizTheme,
  light: {
    ...defaultTheme,
  } satisfies SubstraitVizTheme,
};
