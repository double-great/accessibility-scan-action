import {
  CombinedReportParameters,
  FailuresGroup,
} from "accessibility-insights-report";
import {
  baselineDetails,
  BaselineInfo,
  downloadArtifactsWithLink,
  failedRuleListItem,
  failureDetailsBaseline,
  fixedFailureDetails,
  headingWithMessage,
  link,
  rulesListItem,
  urlsListItem,
} from "./builders.js";

export function sectionHeading(
  failed: FailuresGroup[],
  baselinedEnabled: boolean,
  combinedReportResult: CombinedReportParameters
) {
  return `${
    failed.length === 0 && !baselinedEnabled
      ? headingWithMessage("all applicable checks passed")
      : headingWithMessage()
  }

${downloadArtifactsWithLink(combinedReportResult)}`;
}

export function sectionSummary(
  combinedReportResult: CombinedReportParameters,
  baselinedEnabled: boolean
) {
  const {
    results: {
      resultsByRule: { passed, notApplicable, failed },
      urlResults: { passedUrls, unscannableUrls, failedUrls },
    },
  } = combinedReportResult;
  return `## Scan summary

${urlsListItem(passedUrls, unscannableUrls, failedUrls, baselinedEnabled)}
${rulesListItem(
  passed.length,
  notApplicable.length,
  failed.length,
  baselinedEnabled
)}`;
}

export function sectionFailureSummary(
  {
    results: {
      resultsByRule: { failed },
    },
  }: CombinedReportParameters,
  baselinedEnabled: boolean
) {
  if (failed.length === 0 || baselinedEnabled) {
    return undefined;
  }
  const failedRulesList = failed.map(({ failed }) =>
    failedRuleListItem(
      failed.length,
      failed[0].rule.ruleId,
      failed[0].rule.description
    )
  );
  return `## Failed instances 
  
${failedRulesList.join("\n")}`;
}

export function sectionBaseline(
  baselinedEnabled: boolean,
  baselineInfo: BaselineInfo,
  combinedReportResult: CombinedReportParameters
) {
  if (!baselinedEnabled) return "";
  const content = [
    ...fixedFailureDetails(baselineInfo),
    ...failureDetailsBaseline(combinedReportResult, baselineInfo),
    ...baselineDetails(baselineInfo),
  ]
    .filter((f) => f)
    .join("\n");
  return `## Baseline summary

${content}`;
}

export function sectionFooter({
  axeVersion,
  userAgent,
  browserResolution,
}: CombinedReportParameters): string {
  return `---

This scan used ${link(
    `https://github.com/dequelabs/axe-core/releases/tag/v${axeVersion}`,
    `axe-core ${axeVersion}`
  )} with ${userAgent} and browser resolution ${browserResolution}.`;
}
