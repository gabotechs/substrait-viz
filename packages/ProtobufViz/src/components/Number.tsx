import React from 'react';

interface NumberProps {
  value: number;
  onChange?: (value: number) => void;
}

export const Number: React.FC<NumberProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue)) {
      onChange?.(newValue);
    }
  };

  return (
    <input
      className="w-full px-2 py-1 border rounded z-10"
      type="number"
      value={value}
      onChange={handleChange}
    />
  );
};
