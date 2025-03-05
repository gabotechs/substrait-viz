import { defineConfig, Plugin } from 'vite';
import { glob } from 'glob';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react-swc';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';
import tailwindcss from '@tailwindcss/vite';
import * as fs from 'node:fs';

const base64Loader: Plugin = {
  name: 'base64-loader',
  transform(_: unknown, id: string) {
    const [path, query] = id.split('?');
    if (query != 'base64') return null;

    const data = fs.readFileSync(path);
    const base64 = data.toString('base64');

    return `export default '${base64}';`;
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({ tsconfigPath: './tsconfig.app.json' }),
    tailwindcss(),
    base64Loader,
  ],
  build: {
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: Object.fromEntries(
        glob
          .sync('src/**/*.{ts,tsx}', {
            ignore: ['src/**/*.d.ts', 'src/**/*.stories.tsx'],
          })
          .map(file => [
            // The name of the entry point
            // lib/nested/foo.ts becomes nested/foo
            relative('src', file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['es'],
    },
  },
});
