import { HTMLProps } from 'react';
import { LuX } from 'react-icons/lu';
import { Tooltip } from 'react-tooltip';
import { useThemeMode } from './ThemeModeContext.tsx';

export function CancelButton({
  className = '',
  ...props
}: Omit<HTMLProps<HTMLButtonElement>, 'type'>) {
  const { isDarkMode } = useThemeMode();
  return (
    <>
      <button
        data-tooltip-id="cancel-tooltip"
        data-tooltip-content="Close"
        className={`p-1.5 rounded-md transition-all duration-200 ${className} ${
          isDarkMode
            ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
        }`}
        aria-label="Close"
        {...props}
        type={'button'}
      >
        <LuX size={16} />
      </button>

      <Tooltip
        id="cancel-tooltip"
        place="bottom-end"
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
