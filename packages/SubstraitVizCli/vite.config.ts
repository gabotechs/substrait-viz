import { defineConfig, PluginOption } from 'vite';

import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/postcss';

const plugins: PluginOption[] = [react()];
if (process.env.NODE_ENV === 'development') {
  plugins.push(tsconfigPaths());
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    preserveSymlinks: true,
  },
  css: {
    postcss: {
      // without the ../.., tailwind classes outside of this workspace
      // will not be compiled.
      plugins: [tailwindcss({ base: '../..' })],
    },
  },
  server: {
    fs: {
      allow: ['../../packages'], // Allow Vite to access all workspaces
    },
  },
  optimizeDeps: {
    exclude: ['@substrait-viz/react', '@protobuf-viz/react'],
  },
  plugins,
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'index.js', // Output main JS file as index.js
        assetFileNames: 'index.css', // Output CSS file as index.css
      },
    },
  },
});
