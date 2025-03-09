import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SubstraitViz } from '@substrait-viz/react';
import 'react/jsx-runtime';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>,
);

function Main() {
  const [descriptors, setDescriptors] = React.useState<string[]>();

  React.useEffect(() => {
    fetch(`${window.origin}/descriptors`).then(async res =>
      setDescriptors(await res.json()),
    );
  }, []);

  if (descriptors === undefined) return null;

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <SubstraitViz
        plan={`${window.origin}/plan`}
        protoDescriptorSets={descriptors?.map(
          name => `${window.origin}/descriptor/${name}`,
        )}
      />
    </div>
  );
}
