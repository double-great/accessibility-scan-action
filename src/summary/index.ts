import { CombinedReportParameters } from "accessibility-insights-report";
import { BaselineEvaluation } from "accessibility-insights-scan";
import { getBaselineInfo } from "./builders";
import {
  sectionBaseline,
  sectionFailureSummary,
  sectionHeading,
  sectionSummary,
  sectionFooter,
} from "./sections";

export function markdownSummary(
  combinedReportResult: CombinedReportParameters,
  baselineEvaluation?: BaselineEvaluation
) {
  const {
    results: {
      resultsByRule: { failed },
    },
  } = combinedReportResult;
  const baselineInfo = baselineEvaluation
    ? getBaselineInfo(baselineEvaluation)
    : undefined;
  const baselinedEnabled = baselineInfo !== undefined;

  return [
    sectionHeading(failed, baselinedEnabled, combinedReportResult),
    sectionBaseline(baselinedEnabled, baselineInfo, combinedReportResult),
    sectionSummary(combinedReportResult, baselinedEnabled),
    sectionFailureSummary(combinedReportResult, baselinedEnabled),
    sectionFooter(combinedReportResult),
  ]
    .filter((f) => f)
    .join("\n\n");
}
