import { execSync } from "child_process";
import { existsSync, rmSync } from "fs";
import { homedir, platform } from "os";
import { join } from "path";

const cwd = new URL(".", import.meta.url).pathname;

console.log("Installing dependencies...");

// Skip Puppeteer's postinstall browser download. It fails outright when the
// restored browser cache is incomplete, and ensureBrowser() handles the browser
// instead (system browser if present, otherwise an explicit download).
execSync("npm ci --omit=dev", {
  stdio: "inherit",
  cwd,
  env: { ...process.env, PUPPETEER_SKIP_DOWNLOAD: "true" },
});

ensureBrowser();

console.log("Dependencies installed.");
console.log("Running action...");

const { action } = await import("./action.js");
await action();

// Puppeteer's postinstall does not download a browser. Prefer one already present
// on the runner (GitHub-hosted runners ship Chrome) so the scan does not depend on
// a download; otherwise download one for Puppeteer.
function ensureBrowser() {
  const systemBrowser = findSystemBrowser();
  if (systemBrowser) {
    process.env.PUPPETEER_EXECUTABLE_PATH = systemBrowser;
    console.log(`Using pre-installed browser at ${systemBrowser}`);
    return;
  }

  console.log("No pre-installed browser found; installing one...");
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
}

function findSystemBrowser(): string | undefined {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  const candidates: Record<string, string[]> = {
    linux: [
      "/usr/bin/google-chrome",
      "/usr/bin/google-chrome-stable",
      "/usr/bin/chromium-browser",
      "/usr/bin/chromium",
    ],
    darwin: [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
    ],
  };

  return (candidates[platform()] ?? []).find((candidate) =>
    existsSync(candidate)
  );
}
