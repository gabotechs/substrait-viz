import { ChangeEvent } from 'react';

interface StringProps {
  value: string;
  onChange?: (value: string) => void;
}

export const String = ({ value, onChange }: StringProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};
