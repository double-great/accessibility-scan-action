import { execSync } from "child_process";
console.log("Installing dependencies...");
execSync("npm ci --omit=dev", {
    stdio: "inherit",
    cwd: new URL(".", import.meta.url).pathname,
});
console.log("Dependencies installed.");
console.log("Running action...");
import("./action.js").then(async ({ action }) => {
    await action();
});
