import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SubstraitViz } from '@substrait-viz/react';
import './main.css';

const PLAN = { __substrait_plan: '' };

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="main">
      <SubstraitViz plan={PLAN.__substrait_plan} />
    </div>
  </StrictMode>,
);
