import React from 'react';
import { DroppedFile } from './useFileDrop.ts';

export interface ShareButtonProps {
  plan: DroppedFile;
  isDarkMode: boolean;
}

export function ShareButton({ plan, isDarkMode }: ShareButtonProps) {
  const handleShare = React.useCallback(async () => {
    const shareData = {
      plan: plan.value,
      name: plan.name,
    };

    const shareUrl = `${window.location.origin}${window.location.pathname}?data=${encodeURIComponent(JSON.stringify(shareData))}`;

    await copyToClipboard(shareUrl);
  }, [plan]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
      console.log('Link copied to clipboard');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`p-1.5 rounded-md transition-colors duration-200 ${
        isDarkMode
          ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
      }`}
      title="Share plan"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    </button>
  );
}
