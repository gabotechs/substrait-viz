import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SubstraitViz } from '../lib/SubstraitViz.tsx';
import plan from '../plan.json';
import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="main">
      <SubstraitViz plan={JSON.stringify(plan)} />
    </div>
  </StrictMode>,
);
