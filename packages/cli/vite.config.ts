import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'index.js', // Output main JS file as index.js
        assetFileNames: 'index.css', // Output CSS file as index.css
      },
    },
  },
});
