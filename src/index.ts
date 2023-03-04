// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execFileSync } = require("child_process");
import { argv } from "process";

const nodePath = argv[0];
const npmPath = nodePath.replace(/node$/, "npm");

console.log("Installing dependencies...");
console.log(`nodePath: ${nodePath}`);
console.log(`npmPath: ${npmPath}`);

execFileSync(nodePath, [npmPath, "ci", "--omit=dev"], {
  stdio: "inherit",
  cwd: __dirname,
});

import("./action.js").then(async ({ action }) => {
  await action();
});
