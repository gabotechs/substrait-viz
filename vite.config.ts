import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react-swc';
import { glob } from 'glob';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { extname, relative, resolve } from 'path';
import { defineConfig, Plugin } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import tsconfigPaths from 'vite-tsconfig-paths';

const base64Loader: Plugin = {
  name: 'base64-loader',
  transform(_: unknown, id: string) {
    const [path, query] = id.split('?');
    if (query !== 'base64') return null;

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

/**
 * Options that tell vite info about how the workspace should be compiled.
 */
export interface ConfigOptions {
  /**
   * The dirname in which the vite compilation is happening.
   * It is usually the __dirname builtin variable.
   */
  dirname: string;
  /**
   * The `import.meta.url` variable of the dir in which the
   * Vite compilation is happening
   */
  importMetaUrl: string;
}

const isDev = process.env.NODE_ENV === 'development';

// https://vite.dev/config/
export function config(opts: ConfigOptions) {
  const devPlugins = [tsconfigPaths({ loose: true })];

  return defineConfig({
    plugins: [
      react(),
      libInjectCss(),
      dts({ tsconfigPath: './tsconfig.build.json' }),
      base64Loader,
      binLoader,
    ].concat(isDev ? devPlugins : []),
    css: {
      postcss: {
        // Instead of using @tailwindcss/vite, we use this
        // plugin here, which plays well with the tsconfig
        // path overrides used for development.
        plugins: [tailwindcss({ base: __dirname })],
      },
    },
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
              relative(
                'src',
                file.slice(0, file.length - extname(file).length),
              ),
              // The absolute path to the entry file
              // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
              fileURLToPath(new URL(file, opts.importMetaUrl)),
            ]),
        ),
        output: {
          assetFileNames: 'assets/[name][extname]',
          entryFileNames: '[name].js',
        },
      },
      lib: {
        entry: resolve(opts.dirname, 'src/main.ts'),
        formats: ['es'],
      },
    },
  });
}
