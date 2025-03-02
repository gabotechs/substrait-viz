import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), libInjectCss(), tailwindcss(), viteSingleFile()],
  build: {
    outDir: 'bin',
    emptyOutDir: false,
    rollupOptions: {
      external: ['src/cli.ts'],
    },
  },
});
