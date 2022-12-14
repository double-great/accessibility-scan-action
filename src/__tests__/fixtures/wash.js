module.exports = {
  serviceName: "accessibility-scan-action",
  axeVersion: "4.5.2",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
  browserResolution: "1920x1080",
  scanDetails: {
    baseUrl: "https://www.washington.edu/accesscomputing/AU/before.html",
    basePageTitle: "Accessible University Demo Site - Inaccessible Version",
    scanStart: new Date(),
    scanComplete: new Date(),
    durationSeconds: 5.8,
  },
  results: {
    urlResults: {
      failedUrls: 1,
      passedUrls: 0,
      unscannableUrls: 0,
    },
    resultsByRule: {
      failed: [
        {
          key: "label",
          failed: [
            {
              urls: [
                "https://www.washington.edu/accesscomputing/AU/before.html",
              ],
              elementSelector: 'input[name="name"]',
              snippet: '<input type="text" name="name">',
              fix: {
                any: [
                  {
                    id: "implicit-label",
                    message:
                      "Form element does not have an implicit (wrapped) <label>",
                    data: null,
                  },
                  {
                    id: "explicit-label",
                    message: "Form element does not have an explicit <label>",
                    data: null,
                  },
                  {
                    id: "aria-label",
                    message: "aria-label attribute does not exist or is empty",
                    data: null,
                  },
                  {
                    id: "aria-labelledby",
                    message:
                      "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
                    data: null,
                  },
                  {
                    id: "non-empty-title",
                    message: "Element has no title attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "non-empty-placeholder",
                    message: "Element has no placeholder attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "presentational-role",
                    message:
                      'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                    data: null,
                  },
                ],
                all: [],
                none: [],
                failureSummary:
                  'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
              },
              rule: {
                ruleId: "label",
                tags: [
                  "cat.forms",
                  "wcag2a",
                  "wcag412",
                  "wcag131",
                  "section508",
                  "section508.22.n",
                  "ACT",
                ],
                description: "Ensures every form element has a label",
                ruleUrl:
                  "https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer",
              },
            },
            {
              urls: [
                "https://www.washington.edu/accesscomputing/AU/before.html",
              ],
              elementSelector: 'input[name="email"]',
              snippet: '<input type="text" name="email">',
              fix: {
                any: [
                  {
                    id: "implicit-label",
                    message:
                      "Form element does not have an implicit (wrapped) <label>",
                    data: null,
                  },
                  {
                    id: "explicit-label",
                    message: "Form element does not have an explicit <label>",
                    data: null,
                  },
                  {
                    id: "aria-label",
                    message: "aria-label attribute does not exist or is empty",
                    data: null,
                  },
                  {
                    id: "aria-labelledby",
                    message:
                      "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
                    data: null,
                  },
                  {
                    id: "non-empty-title",
                    message: "Element has no title attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "non-empty-placeholder",
                    message: "Element has no placeholder attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "presentational-role",
                    message:
                      'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                    data: null,
                  },
                ],
                all: [],
                none: [],
                failureSummary:
                  'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
              },
              rule: {
                ruleId: "label",
                tags: [
                  "cat.forms",
                  "wcag2a",
                  "wcag412",
                  "wcag131",
                  "section508",
                  "section508.22.n",
                  "ACT",
                ],
                description: "Ensures every form element has a label",
                ruleUrl:
                  "https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer",
              },
            },
            {
              urls: [
                "https://www.washington.edu/accesscomputing/AU/before.html",
              ],
              elementSelector: 'input[name="country"]',
              snippet: '<input type="text" name="country">',
              fix: {
                any: [
                  {
                    id: "implicit-label",
                    message:
                      "Form element does not have an implicit (wrapped) <label>",
                    data: null,
                  },
                  {
                    id: "explicit-label",
                    message: "Form element does not have an explicit <label>",
                    data: null,
                  },
                  {
                    id: "aria-label",
                    message: "aria-label attribute does not exist or is empty",
                    data: null,
                  },
                  {
                    id: "aria-labelledby",
                    message:
                      "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
                    data: null,
                  },
                  {
                    id: "non-empty-title",
                    message: "Element has no title attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "non-empty-placeholder",
                    message: "Element has no placeholder attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "presentational-role",
                    message:
                      'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                    data: null,
                  },
                ],
                all: [],
                none: [],
                failureSummary:
                  'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
              },
              rule: {
                ruleId: "label",
                tags: [
                  "cat.forms",
                  "wcag2a",
                  "wcag412",
                  "wcag131",
                  "section508",
                  "section508.22.n",
                  "ACT",
                ],
                description: "Ensures every form element has a label",
                ruleUrl:
                  "https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer",
              },
            },
            {
              urls: [
                "https://www.washington.edu/accesscomputing/AU/before.html",
              ],
              elementSelector: 'input[name="major_cs"]',
              snippet: '<input type="checkbox" name="major_cs">',
              fix: {
                any: [
                  {
                    id: "implicit-label",
                    message:
                      "Form element does not have an implicit (wrapped) <label>",
                    data: null,
                  },
                  {
                    id: "explicit-label",
                    message: "Form element does not have an explicit <label>",
                    data: null,
                  },
                  {
                    id: "aria-label",
                    message: "aria-label attribute does not exist or is empty",
                    data: null,
                  },
                  {
                    id: "aria-labelledby",
                    message:
                      "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
                    data: null,
                  },
                  {
                    id: "non-empty-title",
                    message: "Element has no title attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "non-empty-placeholder",
                    message: "Element has no placeholder attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "presentational-role",
                    message:
                      'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                    data: null,
                  },
                ],
                all: [],
                none: [],
                failureSummary:
                  'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
              },
              rule: {
                ruleId: "label",
                tags: [
                  "cat.forms",
                  "wcag2a",
                  "wcag412",
                  "wcag131",
                  "section508",
                  "section508.22.n",
                  "ACT",
                ],
                description: "Ensures every form element has a label",
                ruleUrl:
                  "https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer",
              },
            },
            {
              urls: [
                "https://www.washington.edu/accesscomputing/AU/before.html",
              ],
              elementSelector: 'input[name="major_eng"]',
              snippet: '<input type="checkbox" name="major_eng">',
              fix: {
                any: [
                  {
                    id: "implicit-label",
                    message:
                      "Form element does not have an implicit (wrapped) <label>",
                    data: null,
                  },
                  {
                    id: "explicit-label",
                    message: "Form element does not have an explicit <label>",
                    data: null,
                  },
                  {
                    id: "aria-label",
                    message: "aria-label attribute does not exist or is empty",
                    data: null,
                  },
                  {
                    id: "aria-labelledby",
                    message:
                      "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
                    data: null,
                  },
                  {
                    id: "non-empty-title",
                    message: "Element has no title attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "non-empty-placeholder",
                    message: "Element has no placeholder attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "presentational-role",
                    message:
                      'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                    data: null,
                  },
                ],
                all: [],
                none: [],
                failureSummary:
                  'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
              },
              rule: {
                ruleId: "label",
                tags: [
                  "cat.forms",
                  "wcag2a",
                  "wcag412",
                  "wcag131",
                  "section508",
                  "section508.22.n",
                  "ACT",
                ],
                description: "Ensures every form element has a label",
                ruleUrl:
                  "https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer",
              },
            },
            {
              urls: [
                "https://www.washington.edu/accesscomputing/AU/before.html",
              ],
              elementSelector: 'input[name="major_econ"]',
              snippet: '<input type="checkbox" name="major_econ">',
              fix: {
                any: [
                  {
                    id: "implicit-label",
                    message:
                      "Form element does not have an implicit (wrapped) <label>",
                    data: null,
                  },
                  {
                    id: "explicit-label",
                    message: "Form element does not have an explicit <label>",
                    data: null,
                  },
                  {
                    id: "aria-label",
                    message: "aria-label attribute does not exist or is empty",
                    data: null,
                  },
                  {
                    id: "aria-labelledby",
                    message:
                      "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
                    data: null,
                  },
                  {
                    id: "non-empty-title",
                    message: "Element has no title attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "non-empty-placeholder",
                    message: "Element has no placeholder attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "presentational-role",
                    message:
                      'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                    data: null,
                  },
                ],
                all: [],
                none: [],
                failureSummary:
                  'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
              },
              rule: {
                ruleId: "label",
                tags: [
                  "cat.forms",
                  "wcag2a",
                  "wcag412",
                  "wcag131",
                  "section508",
                  "section508.22.n",
                  "ACT",
                ],
                description: "Ensures every form element has a label",
                ruleUrl:
                  "https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer",
              },
            },
            {
              urls: [
                "https://www.washington.edu/accesscomputing/AU/before.html",
              ],
              elementSelector: 'input[name="major_phy"]',
              snippet: '<input type="checkbox" name="major_phy">',
              fix: {
                any: [
                  {
                    id: "implicit-label",
                    message:
                      "Form element does not have an implicit (wrapped) <label>",
                    data: null,
                  },
                  {
                    id: "explicit-label",
                    message: "Form element does not have an explicit <label>",
                    data: null,
                  },
                  {
                    id: "aria-label",
                    message: "aria-label attribute does not exist or is empty",
                    data: null,
                  },
                  {
                    id: "aria-labelledby",
                    message:
                      "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
                    data: null,
                  },
                  {
                    id: "non-empty-title",
                    message: "Element has no title attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "non-empty-placeholder",
                    message: "Element has no placeholder attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "presentational-role",
                    message:
                      'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                    data: null,
                  },
                ],
                all: [],
                none: [],
                failureSummary:
                  'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
              },
              rule: {
                ruleId: "label",
                tags: [
                  "cat.forms",
                  "wcag2a",
                  "wcag412",
                  "wcag131",
                  "section508",
                  "section508.22.n",
                  "ACT",
                ],
                description: "Ensures every form element has a label",
                ruleUrl:
                  "https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer",
              },
            },
            {
              urls: [
                "https://www.washington.edu/accesscomputing/AU/before.html",
              ],
              elementSelector: 'input[name="major_psy"]',
              snippet: '<input type="checkbox" name="major_psy">',
              fix: {
                any: [
                  {
                    id: "implicit-label",
                    message:
                      "Form element does not have an implicit (wrapped) <label>",
                    data: null,
                  },
                  {
                    id: "explicit-label",
                    message: "Form element does not have an explicit <label>",
                    data: null,
                  },
                  {
                    id: "aria-label",
                    message: "aria-label attribute does not exist or is empty",
                    data: null,
                  },
                  {
                    id: "aria-labelledby",
                    message:
                      "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
                    data: null,
                  },
                  {
                    id: "non-empty-title",
                    message: "Element has no title attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "non-empty-placeholder",
                    message: "Element has no placeholder attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "presentational-role",
                    message:
                      'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                    data: null,
                  },
                ],
                all: [],
                none: [],
                failureSummary:
                  'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
              },
              rule: {
                ruleId: "label",
                tags: [
                  "cat.forms",
                  "wcag2a",
                  "wcag412",
                  "wcag131",
                  "section508",
                  "section508.22.n",
                  "ACT",
                ],
                description: "Ensures every form element has a label",
                ruleUrl:
                  "https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer",
              },
            },
            {
              urls: [
                "https://www.washington.edu/accesscomputing/AU/before.html",
              ],
              elementSelector: 'input[name="major_sp"]',
              snippet: '<input type="checkbox" name="major_sp">',
              fix: {
                any: [
                  {
                    id: "implicit-label",
                    message:
                      "Form element does not have an implicit (wrapped) <label>",
                    data: null,
                  },
                  {
                    id: "explicit-label",
                    message: "Form element does not have an explicit <label>",
                    data: null,
                  },
                  {
                    id: "aria-label",
                    message: "aria-label attribute does not exist or is empty",
                    data: null,
                  },
                  {
                    id: "aria-labelledby",
                    message:
                      "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
                    data: null,
                  },
                  {
                    id: "non-empty-title",
                    message: "Element has no title attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "non-empty-placeholder",
                    message: "Element has no placeholder attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "presentational-role",
                    message:
                      'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                    data: null,
                  },
                ],
                all: [],
                none: [],
                failureSummary:
                  'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
              },
              rule: {
                ruleId: "label",
                tags: [
                  "cat.forms",
                  "wcag2a",
                  "wcag412",
                  "wcag131",
                  "section508",
                  "section508.22.n",
                  "ACT",
                ],
                description: "Ensures every form element has a label",
                ruleUrl:
                  "https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer",
              },
            },
            {
              urls: [
                "https://www.washington.edu/accesscomputing/AU/before.html",
              ],
              elementSelector: 'input[name="captcha"]',
              snippet: '<input type="text" name="captcha">',
              fix: {
                any: [
                  {
                    id: "implicit-label",
                    message:
                      "Form element does not have an implicit (wrapped) <label>",
                    data: null,
                  },
                  {
                    id: "explicit-label",
                    message: "Form element does not have an explicit <label>",
                    data: null,
                  },
                  {
                    id: "aria-label",
                    message: "aria-label attribute does not exist or is empty",
                    data: null,
                  },
                  {
                    id: "aria-labelledby",
                    message:
                      "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
                    data: null,
                  },
                  {
                    id: "non-empty-title",
                    message: "Element has no title attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "non-empty-placeholder",
                    message: "Element has no placeholder attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "presentational-role",
                    message:
                      'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                    data: null,
                  },
                ],
                all: [],
                none: [],
                failureSummary:
                  'Fix any of the following:\n  Form element does not have an implicit (wrapped) <label>\n  Form element does not have an explicit <label>\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element has no placeholder attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
              },
              rule: {
                ruleId: "label",
                tags: [
                  "cat.forms",
                  "wcag2a",
                  "wcag412",
                  "wcag131",
                  "section508",
                  "section508.22.n",
                  "ACT",
                ],
                description: "Ensures every form element has a label",
                ruleUrl:
                  "https://dequeuniversity.com/rules/axe/4.4/label?application=axe-puppeteer",
              },
            },
          ],
        },
        {
          key: "color-contrast",
          failed: [
            {
              urls: [
                "https://www.washington.edu/accesscomputing/AU/before.html",
              ],
              elementSelector: 'li:nth-child(1) > a[href="#"]',
              snippet: '<a href="#">About</a>',
              fix: {
                any: [
                  {
                    id: "color-contrast",
                    message:
                      "Element has insufficient color contrast of 2.52 (foreground color: #8a94a8, background color: #e9e9ed, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
                    data: {
                      fgColor: "#8a94a8",
                      bgColor: "#e9e9ed",
                      contrastRatio: 2.52,
                      fontSize: "12.0pt (16px)",
                      fontWeight: "normal",
                      messageKey: null,
                      expectedContrastRatio: "4.5:1",
                    },
                  },
                ],
                all: [],
                none: [],
                failureSummary:
                  "Fix any of the following:\n  Element has insufficient color contrast of 2.52 (foreground color: #8a94a8, background color: #e9e9ed, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
              },
              rule: {
                ruleId: "color-contrast",
                tags: ["cat.color", "wcag2aa", "wcag143"],
                description:
                  "Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds",
                ruleUrl:
                  "https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer",
              },
            },
            {
              urls: [
                "https://www.washington.edu/accesscomputing/AU/before.html",
              ],
              elementSelector: 'li:nth-child(2) > a[href="#"]',
              snippet: '<a href="#">Academics</a>',
              fix: {
                any: [
                  {
                    id: "color-contrast",
                    message:
                      "Element has insufficient color contrast of 2.52 (foreground color: #8a94a8, background color: #e9e9ed, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
                    data: {
                      fgColor: "#8a94a8",
                      bgColor: "#e9e9ed",
                      contrastRatio: 2.52,
                      fontSize: "12.0pt (16px)",
                      fontWeight: "normal",
                      messageKey: null,
                      expectedContrastRatio: "4.5:1",
                    },
                  },
                ],
                all: [],
                none: [],
                failureSummary:
                  "Fix any of the following:\n  Element has insufficient color contrast of 2.52 (foreground color: #8a94a8, background color: #e9e9ed, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
              },
              rule: {
                ruleId: "color-contrast",
                tags: ["cat.color", "wcag2aa", "wcag143"],
                description:
                  "Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds",
                ruleUrl:
                  "https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer",
              },
            },
            {
              urls: [
                "https://www.washington.edu/accesscomputing/AU/before.html",
              ],
              elementSelector: 'li:nth-child(3) > a[href="#"]',
              snippet: '<a href="#">Admissions</a>',
              fix: {
                any: [
                  {
                    id: "color-contrast",
                    message:
                      "Element has insufficient color contrast of 2.52 (foreground color: #8a94a8, background color: #e9e9ed, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
                    data: {
                      fgColor: "#8a94a8",
                      bgColor: "#e9e9ed",
                      contrastRatio: 2.52,
                      fontSize: "12.0pt (16px)",
                      fontWeight: "normal",
                      messageKey: null,
                      expectedContrastRatio: "4.5:1",
                    },
                  },
                ],
                all: [],
                none: [],
                failureSummary:
                  "Fix any of the following:\n  Element has insufficient color contrast of 2.52 (foreground color: #8a94a8, background color: #e9e9ed, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
              },
              rule: {
                ruleId: "color-contrast",
                tags: ["cat.color", "wcag2aa", "wcag143"],
                description:
                  "Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds",
                ruleUrl:
                  "https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer",
              },
            },
            {
              urls: [
                "https://www.washington.edu/accesscomputing/AU/before.html",
              ],
              elementSelector: 'li:nth-child(4) > a[href="#"]',
              snippet: '<a href="#">Visitors</a>',
              fix: {
                any: [
                  {
                    id: "color-contrast",
                    message:
                      "Element has insufficient color contrast of 2.52 (foreground color: #8a94a8, background color: #e9e9ed, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
                    data: {
                      fgColor: "#8a94a8",
                      bgColor: "#e9e9ed",
                      contrastRatio: 2.52,
                      fontSize: "12.0pt (16px)",
                      fontWeight: "normal",
                      messageKey: null,
                      expectedContrastRatio: "4.5:1",
                    },
                  },
                ],
                all: [],
                none: [],
                failureSummary:
                  "Fix any of the following:\n  Element has insufficient color contrast of 2.52 (foreground color: #8a94a8, background color: #e9e9ed, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
              },
              rule: {
                ruleId: "color-contrast",
                tags: ["cat.color", "wcag2aa", "wcag143"],
                description:
                  "Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds",
                ruleUrl:
                  "https://dequeuniversity.com/rules/axe/4.4/color-contrast?application=axe-puppeteer",
              },
            },
          ],
        },
        {
          key: "image-alt",
          failed: [
            {
              urls: [
                "https://www.washington.edu/accesscomputing/AU/before.html",
              ],
              elementSelector: 'img[src$="slide1.jpg"]',
              snippet: '<img src="images/carousel/slide1.jpg">',
              fix: {
                any: [
                  {
                    id: "has-alt",
                    message: "Element does not have an alt attribute",
                    data: null,
                  },
                  {
                    id: "aria-label",
                    message: "aria-label attribute does not exist or is empty",
                    data: null,
                  },
                  {
                    id: "aria-labelledby",
                    message:
                      "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
                    data: null,
                  },
                  {
                    id: "non-empty-title",
                    message: "Element has no title attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "presentational-role",
                    message:
                      'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                    data: null,
                  },
                ],
                all: [],
                none: [],
                failureSummary:
                  'Fix any of the following:\n  Element does not have an alt attribute\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
              },
              rule: {
                ruleId: "image-alt",
                tags: [
                  "cat.text-alternatives",
                  "wcag2a",
                  "wcag111",
                  "section508",
                  "section508.22.a",
                  "ACT",
                ],
                description:
                  "Ensures <img> elements have alternate text or a role of none or presentation",
                ruleUrl:
                  "https://dequeuniversity.com/rules/axe/4.4/image-alt?application=axe-puppeteer",
              },
            },
            {
              urls: [
                "https://www.washington.edu/accesscomputing/AU/before.html",
              ],
              elementSelector: 'img[src$="captcha.png"]',
              snippet: '<img src="images/captcha.png">',
              fix: {
                any: [
                  {
                    id: "has-alt",
                    message: "Element does not have an alt attribute",
                    data: null,
                  },
                  {
                    id: "aria-label",
                    message: "aria-label attribute does not exist or is empty",
                    data: null,
                  },
                  {
                    id: "aria-labelledby",
                    message:
                      "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
                    data: null,
                  },
                  {
                    id: "non-empty-title",
                    message: "Element has no title attribute",
                    data: {
                      messageKey: "noAttr",
                    },
                  },
                  {
                    id: "presentational-role",
                    message:
                      'Element\'s default semantics were not overridden with role="none" or role="presentation"',
                    data: null,
                  },
                ],
                all: [],
                none: [],
                failureSummary:
                  'Fix any of the following:\n  Element does not have an alt attribute\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element has no title attribute\n  Element\'s default semantics were not overridden with role="none" or role="presentation"',
              },
              rule: {
                ruleId: "image-alt",
                tags: [
                  "cat.text-alternatives",
                  "wcag2a",
                  "wcag111",
                  "section508",
                  "section508.22.a",
                  "ACT",
                ],
                description:
                  "Ensures <img> elements have alternate text or a role of none or presentation",
                ruleUrl:
                  "https://dequeuniversity.com/rules/axe/4.4/image-alt?application=axe-puppeteer",
              },
            },
          ],
        },
        {
          key: "html-has-lang",
          failed: [
            {
              urls: [
                "https://www.washington.edu/accesscomputing/AU/before.html",
              ],
              elementSelector: "html",
              snippet: "<html>",
              fix: {
                any: [
                  {
                    id: "has-lang",
                    message:
                      "The <html> element does not have a lang attribute",
                    data: {
                      messageKey: "noLang",
                    },
                  },
                ],
                all: [],
                none: [],
                failureSummary:
                  "Fix any of the following:\n  The <html> element does not have a lang attribute",
              },
              rule: {
                ruleId: "html-has-lang",
                tags: ["cat.language", "wcag2a", "wcag311", "ACT"],
                description: "Ensures every HTML document has a lang attribute",
                ruleUrl:
                  "https://dequeuniversity.com/rules/axe/4.4/html-has-lang?application=axe-puppeteer",
              },
            },
          ],
        },
      ],
      passed: [
        {
          ruleId: "aria-allowed-attr",
          tags: ["cat.aria", "wcag2a", "wcag412"],
          description:
            "Ensures ARIA attributes are allowed for an element's role",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/aria-allowed-attr?application=axe-puppeteer",
        },
        {
          ruleId: "aria-hidden-body",
          tags: ["cat.aria", "wcag2a", "wcag412"],
          description:
            "Ensures aria-hidden='true' is not present on the document body.",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/aria-hidden-body?application=axe-puppeteer",
        },
        {
          ruleId: "aria-valid-attr",
          tags: ["cat.aria", "wcag2a", "wcag412"],
          description:
            "Ensures attributes that begin with aria- are valid ARIA attributes",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/aria-valid-attr?application=axe-puppeteer",
        },
        {
          ruleId: "aria-valid-attr-value",
          tags: ["cat.aria", "wcag2a", "wcag412"],
          description: "Ensures all ARIA attributes have valid values",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/aria-valid-attr-value?application=axe-puppeteer",
        },
        {
          ruleId: "avoid-inline-spacing",
          tags: ["cat.structure", "wcag21aa", "wcag1412"],
          description:
            "Ensure that text spacing set through style attributes can be adjusted with custom stylesheets",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/avoid-inline-spacing?application=axe-puppeteer",
        },
        {
          ruleId: "document-title",
          tags: ["cat.text-alternatives", "wcag2a", "wcag242", "ACT"],
          description:
            "Ensures each HTML document contains a non-empty <title> element",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/document-title?application=axe-puppeteer",
        },
        {
          ruleId: "duplicate-id-active",
          tags: ["cat.parsing", "wcag2a", "wcag411"],
          description:
            "Ensures every id attribute value of active elements is unique",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/duplicate-id-active?application=axe-puppeteer",
        },
        {
          ruleId: "input-button-name",
          tags: [
            "cat.name-role-value",
            "wcag2a",
            "wcag412",
            "section508",
            "section508.22.a",
          ],
          description: "Ensures input buttons have discernible text",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/input-button-name?application=axe-puppeteer",
        },
        {
          ruleId: "link-name",
          tags: [
            "cat.name-role-value",
            "wcag2a",
            "wcag412",
            "wcag244",
            "section508",
            "section508.22.a",
            "ACT",
          ],
          description: "Ensures links have discernible text",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/link-name?application=axe-puppeteer",
        },
        {
          ruleId: "list",
          tags: ["cat.structure", "wcag2a", "wcag131"],
          description: "Ensures that lists are structured correctly",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/list?application=axe-puppeteer",
        },
        {
          ruleId: "listitem",
          tags: ["cat.structure", "wcag2a", "wcag131"],
          description: "Ensures <li> elements are used semantically",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/listitem?application=axe-puppeteer",
        },
        {
          ruleId: "nested-interactive",
          tags: ["cat.keyboard", "wcag2a", "wcag412"],
          description:
            "Ensures interactive controls are not nested as they are not always announced by screen readers or can cause focus problems for assistive technologies",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/nested-interactive?application=axe-puppeteer",
        },
        {
          ruleId: "td-headers-attr",
          tags: [
            "cat.tables",
            "wcag2a",
            "wcag131",
            "section508",
            "section508.22.g",
          ],
          description:
            "Ensure that each cell in a table that uses the headers attribute refers only to other cells in that table",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/td-headers-attr?application=axe-puppeteer",
        },
        {
          ruleId: "th-has-data-cells",
          tags: [
            "cat.tables",
            "wcag2a",
            "wcag131",
            "section508",
            "section508.22.g",
          ],
          description:
            "Ensure that <th> elements and elements with role=columnheader/rowheader have data cells they describe",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/th-has-data-cells?application=axe-puppeteer",
        },
      ],
      notApplicable: [
        {
          ruleId: "area-alt",
          tags: [
            "cat.text-alternatives",
            "wcag2a",
            "wcag111",
            "wcag244",
            "wcag412",
            "section508",
            "section508.22.a",
            "ACT",
          ],
          description:
            "Ensures <area> elements of image maps have alternate text",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/area-alt?application=axe-puppeteer",
        },
        {
          ruleId: "aria-allowed-role",
          tags: ["cat.aria", "best-practice"],
          description:
            "Ensures role attribute has an appropriate value for the element",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/aria-allowed-role?application=axe-puppeteer",
        },
        {
          ruleId: "aria-command-name",
          tags: ["cat.aria", "wcag2a", "wcag412"],
          description:
            "Ensures every ARIA button, link and menuitem has an accessible name",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/aria-command-name?application=axe-puppeteer",
        },
        {
          ruleId: "aria-hidden-focus",
          tags: ["cat.name-role-value", "wcag2a", "wcag412", "wcag131"],
          description:
            "Ensures aria-hidden elements do not contain focusable elements",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/aria-hidden-focus?application=axe-puppeteer",
        },
        {
          ruleId: "aria-input-field-name",
          tags: ["cat.aria", "wcag2a", "wcag412", "ACT"],
          description: "Ensures every ARIA input field has an accessible name",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/aria-input-field-name?application=axe-puppeteer",
        },
        {
          ruleId: "aria-meter-name",
          tags: ["cat.aria", "wcag2a", "wcag111"],
          description: "Ensures every ARIA meter node has an accessible name",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/aria-meter-name?application=axe-puppeteer",
        },
        {
          ruleId: "aria-progressbar-name",
          tags: ["cat.aria", "wcag2a", "wcag111"],
          description:
            "Ensures every ARIA progressbar node has an accessible name",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/aria-progressbar-name?application=axe-puppeteer",
        },
        {
          ruleId: "aria-required-attr",
          tags: ["cat.aria", "wcag2a", "wcag412"],
          description:
            "Ensures elements with ARIA roles have all required ARIA attributes",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/aria-required-attr?application=axe-puppeteer",
        },
        {
          ruleId: "aria-required-children",
          tags: ["cat.aria", "wcag2a", "wcag131"],
          description:
            "Ensures elements with an ARIA role that require child roles contain them",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/aria-required-children?application=axe-puppeteer",
        },
        {
          ruleId: "aria-required-parent",
          tags: ["cat.aria", "wcag2a", "wcag131"],
          description:
            "Ensures elements with an ARIA role that require parent roles are contained by them",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/aria-required-parent?application=axe-puppeteer",
        },
        {
          ruleId: "aria-roledescription",
          tags: ["cat.aria", "wcag2a", "wcag412"],
          description:
            "Ensure aria-roledescription is only used on elements with an implicit or explicit role",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/aria-roledescription?application=axe-puppeteer",
        },
        {
          ruleId: "aria-roles",
          tags: ["cat.aria", "wcag2a", "wcag412"],
          description:
            "Ensures all elements with a role attribute use a valid value",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/aria-roles?application=axe-puppeteer",
        },
        {
          ruleId: "aria-toggle-field-name",
          tags: ["cat.aria", "wcag2a", "wcag412", "ACT"],
          description: "Ensures every ARIA toggle field has an accessible name",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/aria-toggle-field-name?application=axe-puppeteer",
        },
        {
          ruleId: "aria-tooltip-name",
          tags: ["cat.aria", "wcag2a", "wcag412"],
          description: "Ensures every ARIA tooltip node has an accessible name",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/aria-tooltip-name?application=axe-puppeteer",
        },
        {
          ruleId: "autocomplete-valid",
          tags: ["cat.forms", "wcag21aa", "wcag135"],
          description:
            "Ensure the autocomplete attribute is correct and suitable for the form field",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/autocomplete-valid?application=axe-puppeteer",
        },
        {
          ruleId: "blink",
          tags: [
            "cat.time-and-media",
            "wcag2a",
            "wcag222",
            "section508",
            "section508.22.j",
          ],
          description: "Ensures <blink> elements are not used",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/blink?application=axe-puppeteer",
        },
        {
          ruleId: "button-name",
          tags: [
            "cat.name-role-value",
            "wcag2a",
            "wcag412",
            "section508",
            "section508.22.a",
            "ACT",
          ],
          description: "Ensures buttons have discernible text",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/button-name?application=axe-puppeteer",
        },
        {
          ruleId: "definition-list",
          tags: ["cat.structure", "wcag2a", "wcag131"],
          description: "Ensures <dl> elements are structured correctly",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/definition-list?application=axe-puppeteer",
        },
        {
          ruleId: "dlitem",
          tags: ["cat.structure", "wcag2a", "wcag131"],
          description: "Ensures <dt> and <dd> elements are contained by a <dl>",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/dlitem?application=axe-puppeteer",
        },
        {
          ruleId: "duplicate-id-aria",
          tags: ["cat.parsing", "wcag2a", "wcag411"],
          description:
            "Ensures every id attribute value used in ARIA and in labels is unique",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/duplicate-id-aria?application=axe-puppeteer",
        },
        {
          ruleId: "empty-table-header",
          tags: ["wcag131", "cat.aria"],
          description: "Ensures table headers have discernible text",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/empty-table-header?application=axe-puppeteer",
        },
        {
          ruleId: "frame-focusable-content",
          tags: ["cat.keyboard", "wcag2a", "wcag211"],
          description:
            "Ensures <frame> and <iframe> elements with focusable content do not have tabindex=-1",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/frame-focusable-content?application=axe-puppeteer",
        },
        {
          ruleId: "frame-title",
          tags: [
            "cat.text-alternatives",
            "wcag2a",
            "wcag241",
            "wcag412",
            "section508",
            "section508.22.i",
          ],
          description:
            "Ensures <iframe> and <frame> elements have an accessible name",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/frame-title?application=axe-puppeteer",
        },
        {
          ruleId: "html-lang-valid",
          tags: ["cat.language", "wcag2a", "wcag311", "ACT"],
          description:
            "Ensures the lang attribute of the <html> element has a valid value",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/html-lang-valid?application=axe-puppeteer",
        },
        {
          ruleId: "html-xml-lang-mismatch",
          tags: ["cat.language", "wcag2a", "wcag311", "ACT"],
          description:
            "Ensure that HTML elements with both valid lang and xml:lang attributes agree on the base language of the page",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/html-xml-lang-mismatch?application=axe-puppeteer",
        },
        {
          ruleId: "input-image-alt",
          tags: [
            "cat.text-alternatives",
            "wcag2a",
            "wcag111",
            "section508",
            "section508.22.a",
            "ACT",
          ],
          description:
            'Ensures <input type="image"> elements have alternate text',
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/input-image-alt?application=axe-puppeteer",
        },
        {
          ruleId: "marquee",
          tags: ["cat.parsing", "wcag2a", "wcag222"],
          description: "Ensures <marquee> elements are not used",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/marquee?application=axe-puppeteer",
        },
        {
          ruleId: "meta-refresh",
          tags: [
            "cat.time-and-media",
            "wcag2a",
            "wcag221",
            "wcag224",
            "wcag325",
          ],
          description: 'Ensures <meta http-equiv="refresh"> is not used',
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/meta-refresh?application=axe-puppeteer",
        },
        {
          ruleId: "object-alt",
          tags: [
            "cat.text-alternatives",
            "wcag2a",
            "wcag111",
            "section508",
            "section508.22.a",
          ],
          description: "Ensures <object> elements have alternate text",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/object-alt?application=axe-puppeteer",
        },
        {
          ruleId: "presentation-role-conflict",
          tags: ["cat.aria", "best-practice"],
          description:
            "Flags elements whose role is none or presentation and which cause the role conflict resolution to trigger.",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/presentation-role-conflict?application=axe-puppeteer",
        },
        {
          ruleId: "role-img-alt",
          tags: [
            "cat.text-alternatives",
            "wcag2a",
            "wcag111",
            "section508",
            "section508.22.a",
            "ACT",
          ],
          description: "Ensures [role='img'] elements have alternate text",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/role-img-alt?application=axe-puppeteer",
        },
        {
          ruleId: "select-name",
          tags: [
            "cat.forms",
            "wcag2a",
            "wcag412",
            "wcag131",
            "section508",
            "section508.22.n",
            "ACT",
          ],
          description: "Ensures select element has an accessible name",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/select-name?application=axe-puppeteer",
        },
        {
          ruleId: "server-side-image-map",
          tags: [
            "cat.text-alternatives",
            "wcag2a",
            "wcag211",
            "section508",
            "section508.22.f",
          ],
          description: "Ensures that server-side image maps are not used",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/server-side-image-map?application=axe-puppeteer",
        },
        {
          ruleId: "svg-img-alt",
          tags: [
            "cat.text-alternatives",
            "wcag2a",
            "wcag111",
            "section508",
            "section508.22.a",
            "ACT",
          ],
          description:
            "Ensures <svg> elements with an img, graphics-document or graphics-symbol role have an accessible text",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/svg-img-alt?application=axe-puppeteer",
        },
        {
          ruleId: "valid-lang",
          tags: ["cat.language", "wcag2aa", "wcag312"],
          description: "Ensures lang attributes have valid values",
          ruleUrl:
            "https://dequeuniversity.com/rules/axe/4.4/valid-lang?application=axe-puppeteer",
        },
      ],
    },
  },
};
