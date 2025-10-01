import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  clearMocks: true,
  passWithNoTests: true,
}

export default config
