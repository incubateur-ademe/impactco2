import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/', '<rootDir>/src/'],
  testEnvironment: 'jest-environment-jsdom',
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
}
module.exports = createJestConfig(customJestConfig)
