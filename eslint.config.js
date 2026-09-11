import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: [
      'dist',
      'out',
      'node_modules',
      '**/*.d.ts',
      '**/package.json',
      '.kilo/**',
      'eslint.config.js',
    ],
  },
  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.vitest,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...prettier.rules,
      '@typescript-eslint/naming-convention': ['warn', { selector: 'variable', format: ['camelCase', 'PascalCase', 'UPPER_CASE'], leadingUnderscore: 'allow' }],
      curly: ['warn', 'all'],
      eqeqeq: ['warn', 'always'],
      'no-throw-literal': 'warn',
      '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true, fixToUnknown: false }],
      // Babylon.js interop may require `any` for vendor types not fully typed in 5.x
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
];
