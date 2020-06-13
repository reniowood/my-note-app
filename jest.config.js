module.exports = {
  preset: 'ts-jest',
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  collectCoverageFrom: [
    "src/features/**/*.ts"
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts"
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};