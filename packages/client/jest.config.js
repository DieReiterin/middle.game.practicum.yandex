import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/config/jest/cssTransform.js',
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/config/jest/cssTransform.js',
  },
}
