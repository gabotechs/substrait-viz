import useLocalStorageState from 'use-local-storage-state';
import { DroppedFile } from './useFileDrop.ts';
import { useDarkMode } from './useDarkMode.ts';
import { THEME } from './theme.ts';
import { PlanDrop } from './PlanDrop.tsx';
import { PlanViz } from './PlanViz.tsx';

export function Fiddle() {
  const [plan, setPlan] = useLocalStorageState<DroppedFile>('plan-v2');
  const isDarkMode = useDarkMode();
  const [descriptors, setDescriptors] =
    useLocalStorageState<DroppedFile[]>('descriptors');

  const theme = THEME[isDarkMode ? 'dark' : 'light'];

  return (
    <div
      className="w-screen h-screen relative flex justify-center items-center"
      style={{ background: theme.background, color: theme.textColor }}
    >
      {plan ? (
        <PlanViz
          plan={plan}
          setPlan={setPlan}
          isDarkMode={isDarkMode}
          descriptors={descriptors}
        />
      ) : (
        <PlanDrop
          setPlan={setPlan}
          descriptors={descriptors}
          isDarkMode={isDarkMode}
          setDescriptors={setDescriptors}
        />
      )}
    </div>
  );
}
