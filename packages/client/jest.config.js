import dotenv from 'dotenv'
dotenv.config()
console.log('<rootDir>/config/jest/cssTransform.js')

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/config/jest/cssTransform.js',
  },
}
