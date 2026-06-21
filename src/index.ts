import { execSync } from "child_process";
import { rmSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const cwd = new URL(".", import.meta.url).pathname;

console.log("Installing dependencies...");

execSync("npm ci --omit=dev", {
  stdio: "inherit",
  cwd,
});

// Puppeteer's postinstall does not download a browser, so install it explicitly.
console.log("Installing browser...");

const installBrowser = () =>
  execSync("npx puppeteer browsers install chrome", {
    stdio: "inherit",
    cwd,
  });

try {
  installBrowser();
} catch {
  // A restored cache can leave an incomplete browser folder, which makes the
  // installer fail instead of repairing it. Clear the cache and try once more.
  console.log("Browser install failed; clearing cache and retrying...");
  rmSync(join(homedir(), ".cache", "puppeteer"), {
    recursive: true,
    force: true,
  });
  installBrowser();
}

console.log("Dependencies installed.");
console.log("Running action...");

import("./action.js").then(async ({ action }) => {
  await action();
});
