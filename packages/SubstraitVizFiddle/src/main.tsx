import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'react/jsx-runtime';
import { Fiddle } from './Fiddle.tsx';
import { ThemeModeProvider } from './ThemeModeContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeModeProvider>
      <Fiddle />
    </ThemeModeProvider>
  </StrictMode>,
);
