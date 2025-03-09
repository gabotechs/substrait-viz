import tseslint from 'typescript-eslint';
import baseConfig from '../../eslint.config.mjs';

export default tseslint.config(
  { ignores: ['**/dist', '**/gen'] },
  { extends: [baseConfig] },
);
