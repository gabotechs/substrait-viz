import { DroppedFile } from './useFileDrop.ts';
import { THEME } from './theme.ts';
import { FileCardAdd } from './FileCardAdd.tsx';
import { ThemeToggleButton } from './ThemeToggleButton.tsx';
import { useThemeMode } from './ThemeModeContext.tsx';

export interface DescriptorRequestProps {
  missing: Omit<DroppedFile, 'value'>;
  onFileProvided: (file: DroppedFile) => void;
}

export function DescriptorRequest({
  missing,
  onFileProvided,
}: DescriptorRequestProps) {
  const { isDarkMode } = useThemeMode();
  const theme = THEME[isDarkMode ? 'dark' : 'light'];

  return (
    <div
      className="w-screen h-screen relative flex justify-center items-center"
      style={{ background: theme.background, color: theme.textColor }}
    >
      {/* Theme toggle button in top-right corner */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggleButton />
      </div>

      {/* Main content centered */}
      <div className="flex flex-col items-center gap-6 max-w-2xl px-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Missing {missing.name}</h1>
          <p className="text-lg opacity-80">
            To visualize this plan, we need the following descriptor file:
          </p>
        </div>

        {/* Missing file info */}
        <div
          className="w-full p-6 rounded-lg border-2 border-dashed"
          style={{
            borderColor: theme.boxBorder,
            backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
          }}
        >
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-3">{missing.name}</h2>
            {missing.help && (
              <div className="text-base opacity-80 whitespace-pre-wrap">
                {missing.help}
              </div>
            )}
          </div>
        </div>

        {/* File upload component */}
        <FileCardAdd
          className="h-40 w-80 border-2"
          label={'Upload missing file'}
          theme={theme}
          onAdd={({ value }) => onFileProvided({ ...missing, value })}
        />

        {/* Additional help text */}
        <div className="text-center text-sm opacity-70 max-w-lg">
          <p>
            Drag and drop the required file above, or click to browse for it on
            your computer. This file contains the necessary definitions for
            visualizing the Substrait plan.
          </p>
        </div>
      </div>
    </div>
  );
}
