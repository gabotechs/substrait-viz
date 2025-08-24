import React from 'react';
import { LuFileJson } from 'react-icons/lu';
import { Tooltip } from 'react-tooltip';
import { useThemeMode } from './ThemeModeContext.tsx';
import { DroppedFile } from './useFileDrop.ts';
import { downloadBlob, enforceExtension } from './utils.ts';
import { loadRegistry, substraitFileToJson } from '@substrait-viz/react';

export interface DownloadJSONButtonProps {
  plan: DroppedFile;
  descriptors: undefined | DroppedFile[];
}

export function DownloadJSONButton({ plan, descriptors }: DownloadJSONButtonProps) {
  const { isDarkMode } = useThemeMode();

  const downloadAsJSON = React.useCallback(async () => {
      const registry = await loadRegistry(descriptors?.map(_ => _.value))
      const data = await substraitFileToJson(plan.value, registry)
      const blob = new Blob([data], { type: 'application/json' });
      downloadBlob(enforceExtension(plan.name, 'json'), blob)
  }, [descriptors, plan.name, plan.value]);

  return (
    <>
      <button
        data-tooltip-id="download-json-tooltip"
        data-tooltip-content="Download as JSON"
        onClick={downloadAsJSON}
        className={`p-1.5 rounded-md transition-all duration-200 ${
          isDarkMode
            ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
        }`}
      >
        <LuFileJson size={16} />
      </button>
      
      <Tooltip
        id="download-json-tooltip"
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