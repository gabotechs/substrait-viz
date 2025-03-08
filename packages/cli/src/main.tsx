import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SubstraitViz } from '@substrait-viz/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);

function Main () {
  return <div style={{ width: '100vw', height: '100vh' }}>
    <SubstraitViz plan={`${window.origin}/plan`} />
  </div>;
}