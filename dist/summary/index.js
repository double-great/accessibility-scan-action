"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdownSummary = markdownSummary;
const builders_1 = require("./builders");
const sections_1 = require("./sections");
function markdownSummary(combinedReportResult, baselineEvaluation) {
    const { results: { resultsByRule: { failed }, }, } = combinedReportResult;
    const baselineInfo = baselineEvaluation
        ? (0, builders_1.getBaselineInfo)(baselineEvaluation)
        : undefined;
    const baselinedEnabled = baselineInfo !== undefined;
    return [
        (0, sections_1.sectionHeading)(failed, baselinedEnabled, combinedReportResult),
        (0, sections_1.sectionBaseline)(baselinedEnabled, baselineInfo, combinedReportResult),
        (0, sections_1.sectionSummary)(combinedReportResult, baselinedEnabled),
        (0, sections_1.sectionFailureSummary)(combinedReportResult, baselinedEnabled),
        (0, sections_1.sectionFooter)(combinedReportResult),
    ]
        .filter((f) => f)
        .join("\n\n");
}
