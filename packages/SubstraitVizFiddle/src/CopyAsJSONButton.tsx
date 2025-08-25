import React from 'react';
import { LuCheck, LuFileJson } from 'react-icons/lu';
import { Tooltip } from 'react-tooltip';
import { useThemeMode } from './ThemeModeContext.tsx';
import { DroppedFile } from './useFileDrop.ts';
import { loadRegistry, substraitFileToJson } from '@substrait-viz/react';

export interface DownloadJSONButtonProps {
  plan: DroppedFile;
  descriptors: undefined | DroppedFile[];
}

export function CopyAsJSONButton({
  plan,
  descriptors,
}: DownloadJSONButtonProps) {
  const { isDarkMode } = useThemeMode();
  const [copied, setCopied] = React.useState(false);

  const copyAsJson = React.useCallback(async () => {
    const registry = await loadRegistry(descriptors?.map(_ => _.value));
    const data = await substraitFileToJson(plan.value, registry);

    await navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 1 seconds
  }, [descriptors, plan.value]);

  return (
    <>
      <button
        data-tooltip-id="download-json-tooltip"
        data-tooltip-content={copied ? 'Copied to clipboard' : 'Copy as JSON'}
        onClick={copyAsJson}
        className={`p-1.5 rounded-md transition-all duration-200 ${
          copied
            ? isDarkMode
              ? 'bg-green-700 text-green-200'
              : 'bg-green-100 text-green-700'
            : isDarkMode
              ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
        }`}
      >
        {copied ? <LuCheck size={16} /> : <LuFileJson size={16} />}
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
