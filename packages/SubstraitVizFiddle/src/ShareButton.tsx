import React from 'react';
import { LuShare2, LuCheck } from 'react-icons/lu';
import { Tooltip } from 'react-tooltip';
import { useThemeMode } from './ThemeModeContext.tsx';

export function ShareButton() {
  const { isDarkMode } = useThemeMode();
  const [copied, setCopied] = React.useState(false);

  const handleShare = React.useCallback(async () => {
    const currentUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 1 seconds
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <>
      <button
        data-tooltip-id="share-tooltip"
        data-tooltip-content={
          copied ? 'Copied to clipboard' : 'Copy share link'
        }
        onClick={handleShare}
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
        {copied ? <LuCheck size={16} /> : <LuShare2 size={16} />}
      </button>

      <Tooltip
        id="share-tooltip"
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
