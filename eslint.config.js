import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(
  [
    globalIgnores(['dist']),
    {
      files: ['**/*.{ts,tsx}'],
      plugins: {
        js,
      },
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs.flat.recommended,
        reactRefresh.configs.vite,
      ],
      rules: {
        'no-console': 'warn',
        eqeqeq: 'warn',
        curly: 'warn',
        'no-else-return': 'warn',
      },
      languageOptions: {
        globals: globals.browser,
      },
    },
  ],
  prettierConfig
);
