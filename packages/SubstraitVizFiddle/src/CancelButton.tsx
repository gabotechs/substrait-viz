import { HTMLProps } from 'react';
import { LuX } from 'react-icons/lu';
import { useThemeMode } from './ThemeModeContext.tsx';

export function CancelButton({
  className = '',
  ...props
}: Omit<HTMLProps<HTMLButtonElement>, 'type'>) {
  const { isDarkMode } = useThemeMode();
  return (
    <button
      className={`p-1.5 rounded-md transition-all duration-200 ${className} ${
        isDarkMode
          ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
      }`}
      aria-label="Close"
      {...props}
      type={'button'}
      title="Close"
    >
      <LuX size={16} />
    </button>
  );
}
