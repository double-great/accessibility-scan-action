import { execSync } from "child_process";
const cwd = new URL(".", import.meta.url).pathname;
console.log("Installing dependencies...");
execSync("npm ci --omit=dev", {
    stdio: "inherit",
    cwd,
});
// Puppeteer's postinstall does not download a browser, so install it explicitly.
console.log("Installing browser...");
execSync("npx puppeteer browsers install chrome", {
    stdio: "inherit",
    cwd,
});
console.log("Dependencies installed.");
console.log("Running action...");
import("./action.js").then(async ({ action }) => {
    await action();
});
