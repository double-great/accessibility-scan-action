import { execFileSync } from "child_process";
import { argv } from "process";

const nodePath = argv[0];
const npmPath = nodePath.replace(/node$/, "npm");

console.log("Installing dependencies...");
console.log(`nodePath: ${nodePath}`);
console.log(`npmPath: ${npmPath}`);

execFileSync(npmPath, ["-v"], {
  stdio: "inherit",
  cwd: __dirname,
});

/*
execFileSync(nodePath, [npmPath, "ci", "--omit=dev"], {
  stdio: "inherit",
  cwd: __dirname,
});

import("./action.js").then(async ({ action }) => {
  await action();
});

*/
