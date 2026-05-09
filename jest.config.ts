export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }],
  },
  moduleNameMapper: {
    '^axios$': 'axios',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(axios)/)',
  ],
  collectCoverageFrom: [
    'src/services/**/*.ts',
    '!src/**/*.d.ts',
  ],
};
