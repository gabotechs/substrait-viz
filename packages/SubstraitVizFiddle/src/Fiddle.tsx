import useLocalStorageState from 'use-local-storage-state';
import { DroppedFile } from './useFileDrop.ts';
import { THEME } from './theme.ts';
import { PlanDrop } from './PlanDrop.tsx';
import { PlanViz } from './PlanViz.tsx';
import { usePlanInUrl } from './usePlanInUrl.ts';
import { useThemeMode } from './ThemeModeContext.tsx';
import React, { ReactNode } from 'react';
import { DescriptorRequest } from './DescriptorRequest.tsx';

export function Fiddle() {
  const [missingDescriptor, setMissingDescriptor] =
    React.useState<Omit<DroppedFile, 'value'>>();
  const [plan, setPlan] = useLocalStorageState<DroppedFile>('plan-v2');
  const [descriptors, setDescriptors] =
    useLocalStorageState<DroppedFile[]>('descriptors');

  const { isDarkMode } = useThemeMode();

  usePlanInUrl(plan, setPlan, descriptors, setMissingDescriptor);

  const theme = THEME[isDarkMode ? 'dark' : 'light'];

  const wrap = (children: ReactNode) => (
    <div
      className="w-screen h-screen relative flex justify-center items-center"
      style={{ background: theme.background, color: theme.textColor }}
    >
      {children}
    </div>
  );

  if (missingDescriptor) {
    return wrap(
      <DescriptorRequest
        missing={missingDescriptor}
        onFileProvided={file =>
          setDescriptors(prev => (prev ?? []).concat(file))
        }
      />,
    );
  } else if (plan) {
    return wrap(
      <PlanViz plan={plan} setPlan={setPlan} descriptors={descriptors} />,
    );
  } else {
    return wrap(
      <PlanDrop
        setPlan={setPlan}
        descriptors={descriptors}
        setDescriptors={setDescriptors}
      />,
    );
  }
}
