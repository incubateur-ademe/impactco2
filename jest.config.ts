import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/', '<rootDir>/src/'],
  // testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.polyfills.js', './jest.crash-if-unexpected-remote-call.js'],
  testEnvironmentOptions: {
    customExportConditions: [''], // See https://mswjs.io/docs/migrations/1.x-to-2.x/#cannot-find-module-mswnode-jsdom
  },
  testMatch: [
    '**/testa/**/*.test.js',
    '**/testa/**/*.test.ts',
    '**/testc/**/*.test.js',
    '**/testc/**/*.test.ts',
    '**/testc/**/*.test.tsx',
    '**/testu/**/*.test.js',
    '**/testu/**/*.test.ts',
  ],
  moduleNameMapper: {
    '@incubateur-ademe/publicodes-impact-livraison': 'test-mock/livraison.json',
  },

  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
      useESM: true,
    },
  },
  // testPathIgnorePatterns: ['./testa/', './teste/', './testu/', './testc/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/.*/**',
    '!**/*.config.*',
    '!**/coverage/**',
    '!next-env.d.ts',
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['json'],
}

module.exports = createJestConfig(customJestConfig)
