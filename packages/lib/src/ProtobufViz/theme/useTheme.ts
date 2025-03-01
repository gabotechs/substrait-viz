import React from 'react';
import { ThemeContext } from './ThemeContext.tsx';

export const useTheme = () => React.useContext(ThemeContext);
