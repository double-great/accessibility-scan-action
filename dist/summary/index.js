import { getBaselineInfo } from "./builders.js";
import { sectionBaseline, sectionFailureSummary, sectionHeading, sectionSummary, sectionFooter, } from "./sections.js";
export function markdownSummary(combinedReportResult, baselineEvaluation) {
    const { results: { resultsByRule: { failed }, }, } = combinedReportResult;
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
