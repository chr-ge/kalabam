/** 
 * @type {import('ts-jest/dist/types').InitialOptionsTsJest} 
 * */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  coveragePathIgnorePatterns: ['/node_modules/', './next/'],
  testMatch: ['**/*.(test|spec).(js|ts|tsx)'],
}
