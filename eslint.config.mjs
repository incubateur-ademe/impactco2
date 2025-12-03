import { FlatCompat } from '@eslint/eslintrc'
import next from 'eslint-config-next'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...compat.config({
    extends: ['plugin:prettier/recommended'],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error',
      'react/no-unescaped-entities': 'off',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/set-state-in-render': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/refs': 'warn',
    },
    ignorePatterns: ['*.test.ts', '*.spec.ts', 'server-app.js'],
  }),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'playwright-report/**',
      'prisma/src/**',
      'shopify/**',
      'npm/react/dist/**',
      'webpack.config.js',
      'jest.polyfills.js',
      'next.config.js',
      'playwright.config.js',
      'public/**',
    ],
  },
]

export default eslintConfig
