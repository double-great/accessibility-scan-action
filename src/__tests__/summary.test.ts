import * as core from "@actions/core";
import { markdownSummary } from "../summary";
import jsn from "./fixtures/jsnmrs";
import wash from "./fixtures/wash";

describe("markdownSummary", () => {
  test("with passing checks", () => {
    const md = markdownSummary(jsn, {
      suggestedBaselineUpdate: null,
      newViolationsByRule: {},
      fixedViolationsByRule: {},
      totalNewViolations: 0,
      totalFixedViolations: 0,
    });
    expect(md).toMatchInlineSnapshot(`
"# Accessibility scan: all applicable checks passed

- URLs: 1 URL passed and 0 URLs were not scannable
- Rules: 11 checks passed and 43 checks were not applicable
- Baseline: not configured
- [Download the accessibility report artifact](#artifacts) to view the detailed results of these checks



---

This scan used axe-core 4.5.2 with Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 with a browser resolution of 1920x1080.

"
`);
  });

  test("with failed checks", () => {
    const md = markdownSummary(wash, {
      suggestedBaselineUpdate: null,
      newViolationsByRule: {},
      fixedViolationsByRule: {},
      totalNewViolations: 0,
      totalFixedViolations: 0,
    });
    expect(md).toMatchInlineSnapshot(`
"# Accessibility scan

- URLs: 1 URL failed, 0 URLs passed, and 0 URLs were not scannable
- Rules: 4 checks failed, 14 checks passed, and 35 checks were not applicable
- Baseline: not configured
- [Download the accessibility report artifact](#artifacts) to view the detailed results of these checks

## Failed instances

- 10 × label: Ensures every form element has a label
- 4 × color-contrast: Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds
- 2 × image-alt: Ensures <img> elements have alternate text or a role of none or presentation
- 1 × html-has-lang: Ensures every HTML document has a lang attribute

---

This scan used axe-core 4.5.2 with Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 with a browser resolution of 1920x1080.

"
`);
  });

  test("with failed checks, baseline", () => {
    jest.spyOn(core, "getInput").mockImplementation((v) => {
      switch (v) {
        case "baselineFile":
          return "website.baseline";
        default:
          return "";
      }
    });

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

- URLs: 1 URL failed, 0 URLs passed, and 0 URLs were not scannable
- Rules: 4 checks failed, 14 checks passed, and 35 checks were not applicable
- Baseline: 17 failure instances in baseline not shown
- [Download the accessibility report artifact](#artifacts) to view the detailed results of these checks

## Failed instances

- 10 × label: Ensures every form element has a label
- 4 × color-contrast: Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds
- 2 × image-alt: Ensures <img> elements have alternate text or a role of none or presentation
- 1 × html-has-lang: Ensures every HTML document has a lang attribute

---

This scan used axe-core 4.5.2 with Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 with a browser resolution of 1920x1080.

"
`);
  });

  test("with failed checks, baseline some", () => {
    jest.spyOn(core, "getInput").mockImplementation((v) => {
      switch (v) {
        case "baselineFile":
          return "website.baseline";
        default:
          return "";
      }
    });

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

- URLs: 1 URL failed, 0 URLs passed, and 0 URLs were not scannable
- Rules: 4 checks failed, 14 checks passed, and 35 checks were not applicable
- Baseline: 1 failure instances in baseline not shown
- [Download the accessibility report artifact](#artifacts) to view the detailed results of these checks

## Failed instances

- 10 × label: Ensures every form element has a label
- 4 × color-contrast: Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds
- 2 × image-alt: Ensures <img> elements have alternate text or a role of none or presentation
- 1 × html-has-lang: Ensures every HTML document has a lang attribute

---

This scan used axe-core 4.5.2 with Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 with a browser resolution of 1920x1080.

"
`);
  });

  test("with failed checks, baseline should update", () => {
    jest.spyOn(core, "getInput").mockImplementation((v) => {
      switch (v) {
        case "baselineFile":
          return "website.baseline";
        default:
          return "";
      }
    });

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

- URLs: 1 URL failed, 0 URLs passed, and 0 URLs were not scannable
- Rules: 4 checks failed, 14 checks passed, and 35 checks were not applicable
- Baseline: 1 failure instances in baseline not shown. **You should update the baseline.**
- [Download the accessibility report artifact](#artifacts) to view the detailed results of these checks

## Failed instances

- 10 × label: Ensures every form element has a label
- 4 × color-contrast: Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds
- 2 × image-alt: Ensures <img> elements have alternate text or a role of none or presentation
- 1 × html-has-lang: Ensures every HTML document has a lang attribute

---

This scan used axe-core 4.5.2 with Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 with a browser resolution of 1920x1080.

"
`);
  });
});
