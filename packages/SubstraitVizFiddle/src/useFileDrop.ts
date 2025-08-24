import React, { useCallback, useRef, useState } from 'react';

export interface DroppedFile {
  name: string;
  value: string;
  help?: string
}

export type DragState =
  | 'idle'
  | 'dragging'
  | 'processing'
  | 'success'
  | 'error';

export function useFileDrop(onDrop: (value: DroppedFile) => void) {
  const [dragState, setDragState] = useState<DragState>('idle');
  const [error, setError] = useState<Error | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setFileName(file?.name || null);
    setDragState('dragging');
    setError(null);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragState('idle');
    setFileName(null);
  }, []);

  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const match = result.match(/^data:(.*?);base64,(.*)$/);

        if (!match) {
          setDragState('error');
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
            setDragState('success');
            setTimeout(() => setDragState('idle'), 2000);
            return;
          } catch {
            // this is fine, we'll fall back to base64.
          }
        }

        onDrop({
          name: file.name,
          value: base64,
        });
        setDragState('success');
        setTimeout(() => setDragState('idle'), 2000);
      };
      reader.onerror = () => {
        setDragState('error');
        setError(new Error('Error loading file'));
      };
      reader.readAsDataURL(file);
    },
    [onDrop],
  );

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setDragState('processing');

      const file = event.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setFileName(file.name);
        setDragState('processing');
        handleFile(file);
      }
    },
    [handleFile],
  );

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return {
    dragState,
    error,
    fileName,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    triggerFileInput,
    fileInputRef,
    handleFileSelect,
  };
}
