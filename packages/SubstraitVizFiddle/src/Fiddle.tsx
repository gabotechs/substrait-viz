import useLocalStorageState from 'use-local-storage-state';
import { DroppedFile } from './useFileDrop.ts';
import { THEME } from './theme.ts';
import { PlanDrop } from './PlanDrop.tsx';
import { PlanViz } from './PlanViz.tsx';
import { usePlanInUrl } from './usePlanInUrl.ts';
import { useThemeMode } from './ThemeModeContext.tsx';

export function Fiddle() {
  const [plan, setPlan] = useLocalStorageState<DroppedFile>('plan-v2');
  const [descriptors, setDescriptors] =
    useLocalStorageState<DroppedFile[]>('descriptors');

  const { isDarkMode } = useThemeMode();

  usePlanInUrl(plan, setPlan, descriptors);

  const theme = THEME[isDarkMode ? 'dark' : 'light'];

  return (
    <div
      className="w-screen h-screen relative flex justify-center items-center"
      style={{ background: theme.background, color: theme.textColor }}
    >
      {plan ? (
        <PlanViz plan={plan} setPlan={setPlan} descriptors={descriptors} />
      ) : (
        <PlanDrop
          setPlan={setPlan}
          descriptors={descriptors}
          setDescriptors={setDescriptors}
        />
      )}
    </div>
  );
}
