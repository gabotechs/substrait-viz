import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import { extname, relative, resolve } from 'path';
import { defineConfig, Plugin } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import * as fs from 'node:fs';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

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

const binLoader: Plugin = {
  name: 'bin-loader',
  transform(_: unknown, id: string) {
    const [path, query] = id.split('?');
    if (query !== 'bin') return null;

    const data = fs.readFileSync(path); // Read file as a Buffer
    const uint8Array = new Uint8Array(data); // Convert to Uint8Array

    // Convert Uint8Array to a string representation that can be imported as a module
    return `export default new Uint8Array([${uint8Array.join(',')}]);`;
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
    binLoader,
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
