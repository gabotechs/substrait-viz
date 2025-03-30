import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'react/jsx-runtime';
import { Fiddle } from './Fiddle.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Fiddle />
  </StrictMode>,
);
