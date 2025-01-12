"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sectionHeading = sectionHeading;
exports.sectionSummary = sectionSummary;
exports.sectionFailureSummary = sectionFailureSummary;
exports.sectionBaseline = sectionBaseline;
exports.sectionFooter = sectionFooter;
const builders_1 = require("./builders");
function sectionHeading(failed, baselinedEnabled, combinedReportResult) {
    return `${failed.length === 0 && !baselinedEnabled
        ? (0, builders_1.headingWithMessage)("all applicable checks passed")
        : (0, builders_1.headingWithMessage)()}

${(0, builders_1.downloadArtifactsWithLink)(combinedReportResult)}`;
}
function sectionSummary(combinedReportResult, baselinedEnabled) {
    const { results: { resultsByRule: { passed, notApplicable, failed }, urlResults: { passedUrls, unscannableUrls, failedUrls }, }, } = combinedReportResult;
    return `## Scan summary

${(0, builders_1.urlsListItem)(passedUrls, unscannableUrls, failedUrls, baselinedEnabled)}
${(0, builders_1.rulesListItem)(passed.length, notApplicable.length, failed.length, baselinedEnabled)}`;
}
function sectionFailureSummary({ results: { resultsByRule: { failed }, }, }, baselinedEnabled) {
    if (failed.length === 0 || baselinedEnabled) {
        return undefined;
    }
    const failedRulesList = failed.map(({ failed }) => (0, builders_1.failedRuleListItem)(failed.length, failed[0].rule.ruleId, failed[0].rule.description));
    return `## Failed instances 
  
${failedRulesList.join("\n")}`;
}
function sectionBaseline(baselinedEnabled, baselineInfo, combinedReportResult) {
    if (!baselinedEnabled)
        return "";
    const content = [
        ...(0, builders_1.fixedFailureDetails)(baselineInfo),
        ...(0, builders_1.failureDetailsBaseline)(combinedReportResult, baselineInfo),
        ...(0, builders_1.baselineDetails)(baselineInfo),
    ]
        .filter((f) => f)
        .join("\n");
    return `## Baseline summary

${content}`;
}
function sectionFooter({ axeVersion, userAgent, browserResolution, }) {
    return `---

This scan used ${(0, builders_1.link)(`https://github.com/dequelabs/axe-core/releases/tag/v${axeVersion}`, `axe-core ${axeVersion}`)} with ${userAgent} and browser resolution ${browserResolution}.`;
}
