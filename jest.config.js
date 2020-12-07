module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest'
  },
  moduleFileExtensions: ['js', 'jsx'],
  testMatch: ['**/*.(test|spec).(js|jsx)']
}
