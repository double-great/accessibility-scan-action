# accessibility-scan-action

Scan a website for accessibility issues using axe-core rules engine and Accessibility Insights.

> **Note**
> This is still in development!

## Acknowledgements

This is a fork of [https://github.com/microsoft/accessibility-insights-action](https://github.com/microsoft/accessibility-insights-action). While it's not a direct fork, we decided to build the action piece-by-piece to better understand the code.

<!-- START GENERATED DOCUMENTATION -->

## Set up the workflow

To use this action, create a new workflow in `.github/workflows` and modify it as needed:

```yml
name: Accessibility scan

on:
  workflow_dispatch:
  push:

jobs:
  scan-action:
    runs-on: macOS-latest
    name: Scan for accessibility issues
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Scan site
        uses: double-great/accessibility-scan-action@v0.2.0
        with:
          # Required:
          url: "https://www.washington.edu/accesscomputing/AU/before.html"
          # Optional:
          baselineFile: ${{ github.workspace }}/samples/site.baseline

      - name: Upload report as artifact
        uses: actions/upload-artifact@v3
        if: success() || failure()
        with:
          name: "Accessibility report"
          path: ${{ github.workspace }}/_accessibility-reports/
```

## Action options

- `url`: Required. The URL to start scanning.

- `maxUrls`: The number of urls to scan. Default: `100`.

- `baselineFile`: File path to baseline file.

- `outDir`: The output directory to save the accessibility report. Default: `_accessibility-reports`.

- `inputUrls`: Additional URLs to scan, seperated by a comma.
<!-- END GENERATED DOCUMENTATION -->
