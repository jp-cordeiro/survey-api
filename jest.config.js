module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rooDir>/src/**/*.ts'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
