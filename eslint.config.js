const eslintRecommended = require('eslint/use-at-your-own-risk').builtinRules
const typescriptEslint = require('@typescript-eslint/eslint-plugin')
const typescriptEslintParser = require('@typescript-eslint/parser')
const prettierConfig = require('eslint-config-prettier')

module.exports = [
  eslintRecommended,

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptEslintParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        module: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-expressions': 'off',
      'no-useless-catch': 'off',
    },
  },

  prettierConfig,
]
