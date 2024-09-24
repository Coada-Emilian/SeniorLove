import js from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier'; // Disables ESLint rules that conflict with Prettier
import prettierPlugin from 'eslint-plugin-prettier'; // Adds Prettier as an ESLint rule

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // ESLint rules
      semi: 'error',
      indent: ['error', 2],
      'no-unused-vars': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',

      // Prettier as an ESLint rule
      'prettier/prettier': 'error',
    },
  },
  prettierConfig, // Disables conflicting ESLint rules
];
