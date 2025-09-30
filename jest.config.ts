import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', '<rootDir>/', '<rootDir>/src/'],
  setupFiles: ['./jest.polyfills.js'],
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
    '^@/(.*)$': '<rootDir>/src/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^data/(.*)$': '<rootDir>/src/data/$1',
    '^providers/(.*)$': '<rootDir>/src/providers/$1',
    '\\.(css|less|scss|sass)$': '<rootDir>/test-utils/style-mock.js',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/(?!(next-intl|@tanstack)/)'],
}

export default config
