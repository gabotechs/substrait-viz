import React from 'react';

export const defaultTheme = {
  background: '#fafafa',
  boxBorder: '#e92063',
  boxBackground: '#fff',
  highlightText: '#aaa',
  textColor: '#000',
  lineColor: '#444',
};

export type ProtobufVizTheme = typeof defaultTheme;

export const ThemeContext = React.createContext(defaultTheme);

export const useTheme = () => React.useContext(ThemeContext);
