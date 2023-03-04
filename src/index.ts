import { execSync } from "child_process";
import { argv } from "process";

const nodePath = argv[0];
// const npmPath = nodePath.replace(/node$/, "npm");

const binPath = nodePath.replace(/node$/, "");
console.log(`binPath: ${binPath}`);
execSync(`cd ${binPath} && ls`, {
  stdio: "inherit",
  cwd: __dirname,
});
/*
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
*/
