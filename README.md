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
  pull_request:
    branches:
      - main

jobs:
  scan-action:
    runs-on: ubuntu-latest
    name: Scan for accessibility issues
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      # This action requires Node 20
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Scan site
        id: scan
        uses: double-great/accessibility-scan-action@v0.4.0
        with:
          # Required:
          url: "https://www.washington.edu/accesscomputing/AU/before.html"
          # Optional:
          baselineFile: ${{ github.workspace }}/samples/site.baseline

      # Optional: upload the report as an artifact
      - name: Upload report as artifact
        uses: actions/upload-artifact@v4
        if: success() || failure()
        with:
          name: "Accessibility report"
          path: ${{ github.workspace }}/_accessibility-reports/index.html

      # Optional: post a comment on the pull request with the summary report
      - uses: actions/github-script@v3
        if: github.event_name == 'pull_request'
        with:
          github-token: ${{secrets.GITHUB_TOKEN}}
          script: |
            github.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: ${{ steps.scan.outputs['summary-report'] }}
            })
```

### Additional example workflows

<details>
<summary>Accessibility scan with snapshot</summary>

```yml
name: Accessibility scan with snapshot

on:
  workflow_dispatch:

jobs:
  scan-action:
    runs-on: macOS-latest
    name: Scan for accessibility issues
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Scan site
        uses: double-great/accessibility-scan-action@v0.4.0
        with:
          url: "https://www.washington.edu/accesscomputing/AU/before.html"
          snapshot: true

      - name: Upload report and snapshots as artifact
        uses: actions/upload-artifact@v4
        if: success() || failure()
        with:
          name: "Accessibility report with snapshots"
          path: |
            ${{ github.workspace }}/_accessibility-reports/index.html
            ${{ github.workspace }}/_accessibility-reports/key_value_stores/scan-results/*.jpeg
```

</details>

## Action options

- `url`: Required. The URL to start scanning.

- `maxUrls`: The number of URLs to scan. Default: `100`.

- `baselineFile`: File path to baseline file.

- `outDir`: The output directory to save the accessibility report. Default: `_accessibility-reports`.

- `inputUrls`: Additional URLs to scan, seperated by a comma.

- `snapshot`: Take a screenshot of each page scanned.


## Action outputs

- `summary-report`: The summary report of the scan.
<!-- END GENERATED DOCUMENTATION -->
