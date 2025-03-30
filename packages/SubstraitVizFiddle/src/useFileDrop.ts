import React, { useRef, useState } from 'react';

export interface DroppedFile {
  name: string;
  value: string;
}

export function useFileDrop(onDrop: (value: DroppedFile) => void) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const match = result.match(/^data:(.*?);base64,(.*)$/);

      if (!match) {
        setError(new Error('Invalid file format'));
        return;
      }
      const mimeType = match[1];
      const base64 = match[2];

      if (mimeType === 'application/json') {
        try {
          const decoded = atob(base64);
          JSON.parse(decoded); // Validate it's JSON
          onDrop({
            name: file.name,
            value: decoded,
          });
          return;
        } catch {
          // this is fine, we'll fall back to base64.
        }
      }

      onDrop({
        name: file.name,
        value: base64,
      });
    };
    reader.onerror = () => setError(new Error('Error loading file'));
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return {
    isDragging,
    error,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    triggerFileInput,
    fileInputRef,
    handleFileSelect,
  };
}
