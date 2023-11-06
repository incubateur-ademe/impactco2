const nextJest = require('next/jest')
const createJestConfig = nextJest({
  dir: './',
})
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/', '<rootDir>/src/'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/testc/**/*.test.js', '**/testu/**/*.test.js'],
}
module.exports = createJestConfig(customJestConfig)
