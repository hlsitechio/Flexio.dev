import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Add this rule to suppress the defaultProps warning
      'react/default-props-match-prop-types': 'off',
      // Suppress the warning about defaultProps on memo components
      'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
      // Ignore the warning about defaultProps on memo components
      'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],
    },
  }
);