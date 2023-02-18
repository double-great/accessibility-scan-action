import * as core from "@actions/core";
import { markdownSummary } from "../summary/index";
import jsn from "./fixtures/jsnmrs";
import wash from "./fixtures/wash";

const defaultOptions: {
  [key: string]: string;
} = {
  maxUrls: "100",
  outDir: "_accessibility-reports",
};

jest.spyOn(core, "getBooleanInput").mockImplementation(() => false);

describe("markdownSummary", () => {
  beforeEach(() => {
    jest
      .spyOn(core, "getInput")
      .mockImplementation((v) => defaultOptions[v] || undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("with passing checks", () => {
    defaultOptions.url = "https://jasonmorris.com";

    const md = markdownSummary(jsn, undefined);
    expect(md).toMatchInlineSnapshot(`
"# Accessibility scan: all applicable checks passed

To see scan details, [download the accessibility report](#artifacts).

## Scan summary

- URLs: 1 URL(s) passed, and 0 were not scannable
- Rules: 11 check(s) passed, and 43 were not applicable

---

This scan used [axe-core 4.5.2](https://github.com/dequelabs/axe-core/releases/tag/v4.5.2) with Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 and browser resolution 1920x1080."
`);
  });

  test("with failed checks", () => {
    defaultOptions.url =
      "https://www.washington.edu/accesscomputing/AU/before.html";

    const md = markdownSummary(wash, undefined);
    expect(md).toMatchInlineSnapshot(`
"# Accessibility scan

To see all failures and scan details, [download the accessibility report](#artifacts).

## Scan summary

- URLs: 1 URL(s) failed, 0 URL(s) passed, and 0 were not scannable
- Rules: 4 check(s) failed, 14 check(s) passed, and 35 were not applicable

## Failed instances 
  
- 10 × label:  Ensures every form element has a label
- 4 × color-contrast:  Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds
- 2 × image-alt:  Ensures <img> elements have alternate text or a role of none or presentation
- 1 × html-has-lang:  Ensures every HTML document has a lang attribute

---

This scan used [axe-core 4.5.2](https://github.com/dequelabs/axe-core/releases/tag/v4.5.2) with Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 and browser resolution 1920x1080."
`);
  });

  test("with failed checks, baseline", () => {
    defaultOptions.url =
      "https://www.washington.edu/accesscomputing/AU/before.html";
    defaultOptions.baselineFile = "website.baseline";

    const md = markdownSummary(wash, {
      suggestedBaselineUpdate: null,
      fixedViolationsByRule: {},
      newViolationsByRule: {},
      totalFixedViolations: 0,
      totalNewViolations: 0,
      totalBaselineViolations: 17,
    });
    expect(md).toMatchInlineSnapshot(`
"# Accessibility scan

To see all failures and scan details, [download the accessibility report](#artifacts).

## Baseline summary

- - No failures were detected by automatic scanning except those which exist in the baseline.
- 17 failure instance(s) in baseline, not shown.

## Scan summary

- URLs: 1 URL(s) failed, 0 URL(s) passed, and 0 were not scannable
- Rules: 4 check(s) failed, 14 check(s) passed, and 35 were not applicable

---

This scan used [axe-core 4.5.2](https://github.com/dequelabs/axe-core/releases/tag/v4.5.2) with Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 and browser resolution 1920x1080."
`);
  });

  test("with failed checks, baseline some", () => {
    defaultOptions.url =
      "https://www.washington.edu/accesscomputing/AU/before.html";
    defaultOptions.baselineFile = "website.baseline";

    const md = markdownSummary(wash, {
      suggestedBaselineUpdate: null,
      fixedViolationsByRule: {},
      newViolationsByRule: {},
      totalFixedViolations: 0,
      totalNewViolations: 0,
      totalBaselineViolations: 1,
    });
    expect(md).toMatchInlineSnapshot(`
"# Accessibility scan

To see all failures and scan details, [download the accessibility report](#artifacts).

## Baseline summary

- - No failures were detected by automatic scanning except those which exist in the baseline.
- 1 failure instance(s) in baseline, not shown.

## Scan summary

- URLs: 1 URL(s) failed, 0 URL(s) passed, and 0 were not scannable
- Rules: 4 check(s) failed, 14 check(s) passed, and 35 were not applicable

---

This scan used [axe-core 4.5.2](https://github.com/dequelabs/axe-core/releases/tag/v4.5.2) with Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 and browser resolution 1920x1080."
`);
  });

  test("with failed checks, baseline should update", () => {
    defaultOptions.url =
      "https://www.washington.edu/accesscomputing/AU/before.html";
    defaultOptions.baselineFile = "website.baseline";

    const md = markdownSummary(wash, {
      suggestedBaselineUpdate: {
        metadata: {
          fileFormatVersion: "1",
        },
        results: [
          {
            cssSelector: 'li:nth-child(1) > a[href="#"]',
            htmlSnippet: '<a href="#">About</a>',
            rule: "color-contrast",
            urls: ["https://www.washington.edu/accesscomputing/AU/before.html"],
          },
          {
            cssSelector: 'li:nth-child(2) > a[href="#"]',
            htmlSnippet: '<a href="#">Academics</a>',
            rule: "color-contrast",
            urls: ["https://www.washington.edu/accesscomputing/AU/before.html"],
          },
        ],
      },
      fixedViolationsByRule: {},
      newViolationsByRule: {},
      totalFixedViolations: 0,
      totalNewViolations: 0,
      totalBaselineViolations: 1,
    });
    expect(md).toMatchInlineSnapshot(`
"# Accessibility scan

To see all failures and scan details, [download the accessibility report](#artifacts).

## Baseline summary

- 0 failure instance(s) not in baseline
- 1 failure instance(s) in baseline, not shown. You should update the baseline.

## Scan summary

- URLs: 1 URL(s) failed, 0 URL(s) passed, and 0 were not scannable
- Rules: 4 check(s) failed, 14 check(s) passed, and 35 were not applicable

---

This scan used [axe-core 4.5.2](https://github.com/dequelabs/axe-core/releases/tag/v4.5.2) with Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 and browser resolution 1920x1080."
`);
  });

  test("with passing checks, baseline", () => {
    defaultOptions.url =
      "https://www.washington.edu/accesscomputing/AU/before.html";
    defaultOptions.baselineFile = "website.baseline";

    const md = markdownSummary(
      {
        ...wash,
        results: {
          ...wash.results,
          urlResults: {
            failedUrls: 0,
            passedUrls: 1,
            unscannableUrls: 0,
          },
        },
      },
      {
        suggestedBaselineUpdate: {
          metadata: {
            fileFormatVersion: "1",
          },
          results: [],
        },
        fixedViolationsByRule: {
          "color-contrast": 4,
          "html-has-lang": 1,
          "image-alt": 2,
          label: 10,
        },
        newViolationsByRule: {},
        totalFixedViolations: 17,
        totalNewViolations: 0,
        totalBaselineViolations: 17,
      }
    );
    expect(md).toMatchInlineSnapshot(`
"# Accessibility scan

To see all failures and scan details, [download the accessibility report](#artifacts).

## Baseline summary

- 17 failure instance(s) from baseline no longer exist:
    - (4) color-contrast
    - (1) html-has-lang
    - (2) image-alt
    - (10) label
- 0 failure instance(s) not in baseline
- 17 failure instance(s) in baseline, not shown. You should update the baseline.

## Scan summary

- URLs: 0 URL(s) failed, 1 URL(s) passed, and 0 were not scannable
- Rules: 4 check(s) failed, 14 check(s) passed, and 35 were not applicable

---

This scan used [axe-core 4.5.2](https://github.com/dequelabs/axe-core/releases/tag/v4.5.2) with Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 and browser resolution 1920x1080."
`);
  });
});
