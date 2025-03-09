import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/postcss';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({ projects: [process.env.TS_CONFIG ?? './tsconfig.json'] }),
  ],
  css: {
    postcss: {
      // without the ../.., tailwind classes outside of this workspace
      // will not be compiled.
      plugins: [tailwindcss({ base: '../..' })],
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'index.js', // Output main JS file as index.js
        assetFileNames: 'index.css', // Output CSS file as index.css
      },
    },
  },
});
