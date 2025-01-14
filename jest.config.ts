import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  transform: {
    "^.+\\.(tsx?)$": "ts-jest",
  },
  testPathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/src/__tests__/fixtures/",
    "<rootDir>/src/__tests__/action.test.ts",
  ],
  moduleNameMapper: {
    "./builders.js": "<rootDir>/src/summary/builders.ts",
    "./sections.js": "<rootDir>/src/summary/sections.ts",
  },
};

export default config;
