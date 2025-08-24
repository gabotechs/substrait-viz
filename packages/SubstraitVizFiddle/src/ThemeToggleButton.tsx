import { LuSun, LuMoon } from 'react-icons/lu';
import { Tooltip } from 'react-tooltip';
import { useThemeMode } from './ThemeModeContext.tsx';

export function ThemeToggleButton() {
  const { isDarkMode, toggleDarkMode } = useThemeMode();

  return (
    <>
      <button
        data-tooltip-id="theme-tooltip"
        data-tooltip-content={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={toggleDarkMode}
        className={`p-1.5 rounded-md transition-all duration-200 ${
          isDarkMode
            ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
        }`}
      >
        {isDarkMode ? <LuSun size={16} /> : <LuMoon size={16} />}
      </button>
      
      <Tooltip
        id="theme-tooltip"
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