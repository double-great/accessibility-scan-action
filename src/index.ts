import { execSync } from "child_process";
import { existsSync, rmSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const cwd = new URL(".", import.meta.url).pathname;

console.log("Installing dependencies...");

execSync("npm ci --omit=dev", {
  stdio: "inherit",
  cwd,
});

// Puppeteer's postinstall does not download a browser, so make sure one is
// present before scanning. Reuse a cached browser when it is complete.
const { default: puppeteer } = await import("puppeteer");
const executablePath = puppeteer.executablePath();

if (existsSync(executablePath)) {
  console.log(`Browser already installed at ${executablePath}`);
} else {
  console.log("Installing browser...");
  // A partially-downloaded browser folder makes the installer fail instead of
  // repairing it, so clear the cache before installing.
  rmSync(join(homedir(), ".cache", "puppeteer"), {
    recursive: true,
    force: true,
  });
  execSync("npx puppeteer browsers install chrome", {
    stdio: "inherit",
    cwd,
  });
  if (!existsSync(executablePath)) {
    throw new Error(`Browser was not installed at ${executablePath}`);
  }
}

console.log("Dependencies installed.");
console.log("Running action...");

const { action } = await import("./action.js");
await action();
