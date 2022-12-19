import { getInput } from "@actions/core";
import { CombinedReportParameters } from "accessibility-insights-report";
import { BaselineEvaluation } from "accessibility-insights-scan";

export declare type BaselineInfo = {
  baselineFileName?: string;
  baselineEvaluation?: BaselineEvaluation;
};

export function getBaselineInfo(
  baselineEvaluation?: BaselineEvaluation
): BaselineInfo {
  const baselineFileName = getInput("baselineFile") || null;

  if (!baselineFileName) {
    return {} as BaselineInfo;
  }

  return { baselineFileName, baselineEvaluation };
}

export const link = (href: string, text: string): string =>
  `[${text}](${href})`;

export const listItem = (text: string): string => `- ${text}`;

export function headingWithMessage(message?: string): string {
  return `# Accessibility scan${message ? `: ${message}` : ""}`;
}

export function baselineDetails(baselineInfo: BaselineInfo): string[] {
  const { baselineFileName, baselineEvaluation } = baselineInfo;

  if (baselineFileName === undefined) {
    return ["- Baseline not configured"];
  }

  if (baselineEvaluation === undefined) {
    return [`- Baseline not detected`];
  }

  const { totalNewViolations, totalBaselineViolations } = baselineEvaluation;

  if (
    totalBaselineViolations === undefined ||
    (totalBaselineViolations === 0 && totalNewViolations > 0)
  ) {
    return [`- Baseline not detected`];
  }

  const shouldUpdate = shouldUpdateBaselineFile(baselineEvaluation);

  if (totalBaselineViolations > 0 || shouldUpdate) {
    return [
      `- ${totalBaselineViolations} failure instance(s) in baseline, not shown.${
        shouldUpdate ? " You should update the baseline." : ""
      })`,
    ];
  }

  return [];
}

export function shouldUpdateBaselineFile(
  baselineEvaluation: BaselineEvaluation
): boolean {
  return baselineEvaluation && baselineEvaluation.suggestedBaselineUpdate
    ? true
    : false;
}

export function hasFixedFailureResults(
  baselineEvaluation: BaselineEvaluation
): boolean {
  if (baselineEvaluation && baselineEvaluation.fixedViolationsByRule) {
    for (const _ in baselineEvaluation.fixedViolationsByRule) {
      return true;
    }
  }

  return false;
}

export const urlsListItem = (
  passedUrls: number,
  unscannableUrls: number,
  failedUrls: number,
  baselinedEnabled = false
): string => {
  const failedUrlsSummary = `${failedUrls} URL(s) failed, `;
  const passedAndUnscannableUrlsSummary = `${passedUrls} URL(s) passed, and ${unscannableUrls} were not scannable`;
  const urlsSummary =
    failedUrls === 0 && !baselinedEnabled
      ? passedAndUnscannableUrlsSummary
      : failedUrlsSummary.concat(passedAndUnscannableUrlsSummary);
  return listItem(`${`URLs`}: ${urlsSummary}`);
};

export const rulesListItem = (
  passedChecks: number,
  inapplicableChecks: number,
  failedChecks: number,
  baselinedEnabled = false
) => {
  const failedRulesSummary = `${failedChecks} check(s) failed, `;
  const passedAndInapplicableRulesSummary = `${passedChecks} check(s) passed, and ${inapplicableChecks} were not applicable`;
  const rulesSummary =
    failedChecks === 0 && !baselinedEnabled
      ? passedAndInapplicableRulesSummary
      : failedRulesSummary.concat(passedAndInapplicableRulesSummary);
  return listItem(`${`Rules`}: ${rulesSummary}`);
};

export const failedRuleListItem = (
  failureCount: number,
  ruleId: string,
  description: string
) => {
  return listItem(`${`${failureCount} × ${ruleId}`}:  ${description}`);
};

export function fixedFailureDetails({
  baselineEvaluation,
}: BaselineInfo): string[] {
  if (!hasFixedFailureResults(baselineEvaluation)) {
    return [];
  }

  let count = 0;
  const fixedFailureInstanceLines: string[] = [];
  const { fixedViolationsByRule } = baselineEvaluation;

  for (const ruleId in fixedViolationsByRule) {
    const fixedFailureInstanceCount = fixedViolationsByRule[ruleId];
    count += fixedFailureInstanceCount;
    fixedFailureInstanceLines.push(
      `    - (${fixedFailureInstanceCount}) ${ruleId}`
    );
  }

  return [
    `- ${count} failure instance(s) from baseline no longer exist:
${fixedFailureInstanceLines.join("\n")}`,
  ];
}

export const failureDetailsBaseline = (
  combinedReportResult: CombinedReportParameters,
  baselineInfo: BaselineInfo
): string[] => {
  if (
    hasFailures(combinedReportResult, baselineInfo.baselineEvaluation) ||
    shouldUpdateBaselineFile(baselineInfo.baselineEvaluation)
  ) {
    const failedRulesList = getFailedRulesList(
      combinedReportResult,
      baselineInfo.baselineEvaluation
    );
    const failureInstances = getFailureInstances(
      combinedReportResult,
      baselineInfo.baselineEvaluation
    );
    return [
      `- ${failureInstances} failure instance(s)${
        baselineHasFailures(baselineInfo.baselineEvaluation)
          ? " not in baseline"
          : ""
      }`,
      ...failedRulesList,
    ];
  }
  return baselineHasFailures(baselineInfo.baselineEvaluation)
    ? [
        `- - No failures were detected by automatic scanning except those which exist in the baseline.`,
      ]
    : [`- - No failures were detected by automatic scanning.`];
};

export const getTotalFailureInstancesFromResults = ({
  results,
}: CombinedReportParameters): number => {
  return results.resultsByRule.failed.reduce(
    (a, b) => a + b.failed.reduce((c, d) => c + d.urls.length, 0),
    0
  );
};

export const getFailureInstances = (
  combinedReportResult: CombinedReportParameters,
  baselineEvaluation: BaselineEvaluation
): number => {
  if (baselineEvaluation) {
    return baselineEvaluation.totalNewViolations;
  }

  return getTotalFailureInstancesFromResults(combinedReportResult);
};

export const getFailedRulesList = (
  combinedReportResult: CombinedReportParameters,
  baselineEvaluation: BaselineEvaluation
): string[] => {
  if (baselineEvaluation) {
    return getNewFailuresList(combinedReportResult, baselineEvaluation);
  }

  return getFailedRulesListWithNoBaseline(combinedReportResult);
};

export const getNewFailuresList = (
  combinedReportResult: CombinedReportParameters,
  { newViolationsByRule }: BaselineEvaluation
): string[] => {
  const newFailuresList = [];
  for (const ruleId in newViolationsByRule) {
    const failureCount = newViolationsByRule[ruleId];
    const ruleDescription = getRuleDescription(combinedReportResult, ruleId);
    newFailuresList.push(
      [failedRuleListItemBaseline(failureCount, ruleId, ruleDescription)].join(
        ""
      )
    );
  }

  return newFailuresList;
};

export const getFailedRulesListWithNoBaseline = ({
  results,
}: CombinedReportParameters): string[] => {
  return results.resultsByRule.failed.map(({ failed }) => {
    const failureCount = failed.reduce((a, b) => a + b.urls.length, 0);
    const { ruleId, description } = failed[0].rule;
    return [failedRuleListItemBaseline(failureCount, ruleId, description)].join(
      ""
    );
  });
};

export const getRuleDescription = (
  { results }: CombinedReportParameters,
  ruleId: string
): string => {
  const matchingFailuresGroup = results.resultsByRule.failed.find(
    (failuresGroup) => failuresGroup.failed[0].rule.ruleId === ruleId
  );

  return matchingFailuresGroup.failed[0].rule.description;
};

export const failedRuleListItemBaseline = (
  failureCount: number,
  ruleId: string,
  description: string
) => {
  return listItem(`(${failureCount}) ${ruleId}: ${description}`);
};

export function downloadArtifactsWithLink(
  combinedReportResult: CombinedReportParameters,
  baselineEvaluation?: BaselineEvaluation
): string[] {
  const details =
    !baselineHasFailures(baselineEvaluation) &&
    !hasFailures(combinedReportResult, baselineEvaluation)
      ? "scan details"
      : "all failures and scan details";

  return [
    `To see ${details}, ${link(
      "#artifacts",
      "download the accessibility report"
    )}.`,
  ];
}

export const baselineHasFailures = (
  baselineEvaluation: BaselineEvaluation
): boolean => {
  return (
    baselineEvaluation?.totalBaselineViolations &&
    baselineEvaluation?.totalBaselineViolations > 0
  );
};

export const hasFailures = (
  combinedReportResult: CombinedReportParameters,
  baselineEvaluation: BaselineEvaluation
): boolean => {
  if (baselineEvaluation !== undefined) {
    return baselineEvaluation.totalNewViolations > 0;
  }

  return getTotalFailureInstancesFromResults(combinedReportResult) > 0;
};
