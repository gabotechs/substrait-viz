import { SubstraitViz, SubstraitVizProps } from '../src/SubstraitViz';

export function FullScreenPlan(props: SubstraitVizProps) {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <SubstraitViz {...props} />
    </div>
  );
}
