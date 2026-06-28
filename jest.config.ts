import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
  testPathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/src/__tests__/fixtures/",
    "<rootDir>/src/__tests__/action.test.ts",
  ],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};

export default config;
