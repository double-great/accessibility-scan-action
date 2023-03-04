import { execFileSync } from "child_process";
import { argv } from "process";

const npmPath = argv[0].replace(/node$/, "npm");

console.log("Installing dependencies...");

execFileSync(npmPath, ["ci", "--omit=dev"], {
  stdio: "inherit",
  cwd: __dirname,
});

import("./action.js").then(async ({ action }) => {
  await action();
});
