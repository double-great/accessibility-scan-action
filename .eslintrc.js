// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
module.exports = {
  env: {
    es2017: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
    ecmaVersion: 8,
  },
  plugins: ["@typescript-eslint"],
  rules: {},

  ignorePatterns: ["**/*.js"],
};
