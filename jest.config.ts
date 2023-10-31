import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/', '<rootDir>/src/'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/testc/**/*.test.js', '**/testu/**/*.test.js', '**/testu/**/*.test.ts'],
}
module.exports = createJestConfig(customJestConfig)
