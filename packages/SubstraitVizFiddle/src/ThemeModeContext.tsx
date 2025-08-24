import React, { createContext, useCallback, useContext } from 'react';
import useLocalStorageState from 'use-local-storage-state';

interface ThemeModeContext {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeMode = createContext<ThemeModeContext | undefined>(undefined);

export interface ThemeModeProviderProps {
  children: React.ReactNode;
}

export function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState('dark-mode', {
    defaultValue: () => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      return mediaQuery.matches;
    },
  });

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, [setIsDarkMode]);

  return (
    <ThemeMode.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeMode.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useThemeMode(): ThemeModeContext {
  const context = useContext(ThemeMode);
  if (context === undefined) {
    throw new Error(
      'useDarkModeContext must be used within a DarkModeProvider',
    );
  }
  return context;
}
