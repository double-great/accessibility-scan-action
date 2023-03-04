"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const process_1 = require("process");
const nodePath = process_1.argv[0];
const npmPath = nodePath.replace(/node$/, "npm");
console.log("Installing dependencies...");
console.log(`nodePath: ${nodePath}`);
console.log(`npmPath: ${npmPath}`);
(0, child_process_1.execFileSync)(npmPath, ["-v"], {
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
