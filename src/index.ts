import { execSync } from "child_process";

execSync("npm ci --omit=dev", {
  stdio: "inherit",
  cwd: __dirname,
});

import("./action.js").then(async ({ action }) => {
  await action();
});
