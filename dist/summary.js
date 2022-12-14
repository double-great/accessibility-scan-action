"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdownSummary = void 0;
const core_1 = require("@actions/core");
function s(num) {
    return num === 1 ? "" : "s";
}
function toWords(number, type) {
    return `${number} ${type}${s(number)}`;
}
function and(array) {
    const lf = new Intl.ListFormat("en");
    return lf.format(array);
}
function markdownSummary({ results: { urlResults: { failedUrls, passedUrls, unscannableUrls }, resultsByRule: { failed, passed, notApplicable }, }, axeVersion, browserResolution, userAgent, }, baselineEvaluation) {
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
exports.markdownSummary = markdownSummary;
function showFailedInstances(failed, failedUrls) {
    if (failedUrls === 0)
        return "";
    const listItem = (rule) => `- ${rule.failed.length} × ${rule.key}: ${rule.failed[0].rule.description}`;
    return `## Failed instances

${failed.map(listItem).join("\n")}`;
}
function getBaselineInfo(baselineEvaluation) {
    const baselineFileName = (0, core_1.getInput)("baselineFile") || null;
    if (!baselineFileName) {
        return {};
    }
    return { baselineFileName, baselineEvaluation };
}
function summaryBaseline(baseline) {
    const baselineEvaluation = getBaselineInfo(baseline);
    const baselineFile = (0, core_1.getInput)("baselineFile") || undefined;
    if (baselineFile === undefined) {
        return `not configured`;
    }
    if (baselineEvaluation === undefined) {
        return `not detected`;
    }
    const { totalNewViolations, totalBaselineViolations } = baseline;
    if (totalBaselineViolations === undefined ||
        (totalBaselineViolations === 0 && totalNewViolations > 0)) {
        return `not detected`;
    }
    if (totalBaselineViolations > 0 || shouldUpdateBaselineFile(baseline)) {
        return `${totalBaselineViolations} failure instances in baseline not shown${shouldUpdateBaselineFile(baseline)
            ? ". **You should update the baseline.**"
            : ""}`;
    }
    return "not configured";
}
function shouldUpdateBaselineFile(baselineEvaluation) {
    return baselineEvaluation && baselineEvaluation.suggestedBaselineUpdate
        ? true
        : false;
}
