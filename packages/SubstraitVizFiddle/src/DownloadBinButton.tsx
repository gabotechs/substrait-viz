import React from 'react';
import { LuFileSpreadsheet } from 'react-icons/lu';
import { Tooltip } from 'react-tooltip';
import { useThemeMode } from './ThemeModeContext.tsx';
import { DroppedFile } from './useFileDrop.ts';
import { loadRegistry } from '@substrait-viz/react';
import { substraitFileToBin } from '@substrait-viz/react';
import { downloadBlob, enforceExtension } from './utils.ts';

export interface DownloadBinButtonProps {
  plan: DroppedFile;
  descriptors: undefined | DroppedFile[];
}

export function DownloadBinButton({
  plan,
  descriptors,
}: DownloadBinButtonProps) {
  const { isDarkMode } = useThemeMode();

  const downloadAsBin = React.useCallback(async () => {
    const registry = await loadRegistry(descriptors?.map(_ => _.value));
    const data = await substraitFileToBin(plan.value, registry);
    const blob = new Blob([data], { type: 'application/json' });
    downloadBlob(enforceExtension(plan.name, 'bin'), blob);
  }, [descriptors, plan.name, plan.value]);

  return (
    <>
      <button
        data-tooltip-id="download-bin-tooltip"
        data-tooltip-content="Download as binary"
        onClick={downloadAsBin}
        className={`p-1.5 rounded-md transition-all duration-200 ${
          isDarkMode
            ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
        }`}
      >
        <LuFileSpreadsheet size={16} />
      </button>

      <Tooltip
        id="download-bin-tooltip"
        place="bottom"
        variant={isDarkMode ? 'dark' : 'light'}
        style={{
          backgroundColor: isDarkMode ? '#374151' : '#111827',
          color: '#ffffff',
          borderRadius: '6px',
          fontSize: '12px',
          zIndex: 9999,
        }}
      />
    </>
  );
}
