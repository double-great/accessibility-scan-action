import { getInput } from "@actions/core";
import AccessibilityInsightsReport, {
  CombinedReportParameters,
} from "accessibility-insights-report";
import { BaselineEvaluation } from "accessibility-insights-scan";

export declare type BaselineInfo = {
  baselineFileName?: string;
  baselineEvaluation?: BaselineEvaluation;
};

function s(num: number) {
  return num === 1 ? "" : "s";
}

function toWords(number: number, type: "check" | "URL") {
  return `${number} ${type}${s(number)}`;
}

function and(array: string[]) {
  const lf = new Intl.ListFormat("en");
  return lf.format(array);
}

export function markdownSummary(
  {
    results: {
      urlResults: { failedUrls, passedUrls, unscannableUrls },
      resultsByRule: { failed, passed, notApplicable },
    },
    axeVersion,
    browserResolution,
    userAgent,
  }: CombinedReportParameters,
  baselineEvaluation: BaselineEvaluation
) {
  const status = failedUrls === 0 ? ": all applicable checks passed" : "";

  const urls = [
    ...(failedUrls > 0 ? [`${toWords(failedUrls, "URL")} failed`] : []),
    `${toWords(passedUrls, "URL")} passed`,
    `${toWords(unscannableUrls, "URL")} were not scannable`,
  ];

  const rules = [
    ...(failed.length > 0 ? [`${toWords(failed.length, "check")} failed`] : []),
    `${toWords(passed.length, "check")} passed`,
    `${toWords(notApplicable.length, "check")} were not applicable`,
  ];

  return `# Accessibility scan${status}

- URLs: ${and(urls)}
- Rules: ${and(rules)}
- Baseline: ${summaryBaseline(baselineEvaluation)}
- [Download the accessibility report artifact](#artifacts) to view the detailed results of these checks

${showFailedInstances(failed, failedUrls)}

---

This scan used axe-core ${axeVersion} with ${userAgent} with a browser resolution of ${browserResolution}.

`;
}

function showFailedInstances(
  failed: CombinedReportParameters["results"]["resultsByRule"]["failed"],
  failedUrls: CombinedReportParameters["results"]["urlResults"]["failedUrls"]
) {
  if (failedUrls === 0) return "";
  const listItem = (rule: AccessibilityInsightsReport.FailuresGroup) =>
    `- ${rule.failed.length} × ${rule.key}: ${rule.failed[0].rule.description}`;
  return `## Failed instances

${failed.map(listItem).join("\n")}`;
}

function getBaselineInfo(baselineEvaluation?: BaselineEvaluation) {
  const baselineFileName = getInput("baselineFile") || null;

  if (!baselineFileName) {
    return {} as BaselineInfo;
  }

  return { baselineFileName, baselineEvaluation };
}

function summaryBaseline(baseline: BaselineEvaluation) {
  const baselineEvaluation = getBaselineInfo(baseline);
  const baselineFile = getInput("baselineFile") || undefined;

  if (baselineFile === undefined) {
    return `not configured`;
  }

  if (baselineEvaluation === undefined) {
    return `not detected`;
  }

  const { totalNewViolations, totalBaselineViolations } = baseline;

  if (
    totalBaselineViolations === undefined ||
    (totalBaselineViolations === 0 && totalNewViolations > 0)
  ) {
    return `not detected`;
  }

  if (totalBaselineViolations > 0 || shouldUpdateBaselineFile(baseline)) {
    return `${totalBaselineViolations} failure instances in baseline not shown${
      shouldUpdateBaselineFile(baseline)
        ? ". **You should update the baseline.**"
        : ""
    }`;
  }

  return "not configured";
}

function shouldUpdateBaselineFile(
  baselineEvaluation: BaselineEvaluation
): boolean {
  return baselineEvaluation && baselineEvaluation.suggestedBaselineUpdate
    ? true
    : false;
}
