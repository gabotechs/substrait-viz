import { HTMLProps, useState } from 'react';
import { SubstraitVizTheme } from '@substrait-viz/react';
import { CancelButton } from './CancelButton.tsx';
import { Tooltip } from 'react-tooltip';

export interface FileCardProps extends HTMLProps<HTMLDivElement> {
  name: string;
  help: string;
  theme: SubstraitVizTheme;
  setHelp: (value: string) => void;
  onDelete: () => void;
}

export function FileCard({
  name,
  help,
  setHelp,
  theme,
  className = '',
  onDelete,
  ...props
}: FileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempHelp, setTempHelp] = useState(help);

  const handleSave = () => {
    setHelp(tempHelp);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setTempHelp(help);
    setIsEditing(true);
  };

  return (
    <div
      className={`${className} relative flex flex-col justify-center items-center text-center rounded-md border p-3`}
      style={{ borderColor: theme.boxBorder }}
      {...props}
    >
      <CancelButton
        className={'absolute top-1 right-1'}
        onClick={() => onDelete()}
      />

      <div className="font-semibold mb-2">{name}</div>

      <div className="flex-1 w-full flex flex-col">
        {isEditing ? (
          <textarea
            value={tempHelp}
            onChange={e => setTempHelp(e.target.value)}
            onBlur={handleSave}
            placeholder="Add help text for this descriptor..."
            className={`flex-1 w-full text-xs p-2 rounded border resize-none text-left ${
              theme.background === '#ffffff'
                ? 'bg-white border-gray-300 text-gray-800'
                : 'bg-gray-700 border-gray-600 text-gray-200'
            }`}
            style={{ minHeight: '60px' }}
            autoFocus
          />
        ) : (
          <div
            data-tooltip-id="edit-help-tooltip"
            data-tooltip-content="Click to edit help text"
            onClick={handleEditClick}
            className="flex-1 text-xs opacity-80 cursor-pointer hover:opacity-100 transition-opacity duration-200 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 text-left whitespace-pre-wrap overflow-auto"
          >
            {help || (
              <span className="italic opacity-60">Click to add help text</span>
            )}
          </div>
        )}
      </div>

      {/* Tooltips */}
      <Tooltip id="edit-help-tooltip" place="bottom" />
    </div>
  );
}
