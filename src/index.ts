// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require("child_process");

execSync("npm ci --omit=dev", {
  stdio: "inherit",
  cwd: __dirname,
});

import("./action.js").then(async ({ action }) => {
  await action();
});
