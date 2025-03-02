import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SubstraitViz } from '@substrait-viz/react';

const PLAN = { __substrait_plan: '' };

if (import.meta.env.VITE_PLAN) {
  PLAN.__substrait_plan = import.meta.env.VITE_PLAN;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ width: '100vw', height: '100vh' }}>
      <SubstraitViz plan={PLAN.__substrait_plan} />
    </div>
  </StrictMode>,
);
