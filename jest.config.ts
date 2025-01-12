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
};

export default config;
