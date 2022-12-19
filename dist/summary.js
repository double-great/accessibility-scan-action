"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildContent = exports.sectionSeparator = exports.footerSeparator = exports.listItem = exports.link = exports.markdownSummary = void 0;
const core_1 = require("@actions/core");
function markdownSummary(combinedReportResult, baselineEvaluation) {
    const baselineInfo = baselineEvaluation
        ? getBaselineInfo(baselineEvaluation)
        : undefined;
    return buildContent(combinedReportResult, baselineInfo);
}
exports.markdownSummary = markdownSummary;
function getBaselineInfo(baselineEvaluation) {
    const baselineFileName = (0, core_1.getInput)("baselineFile") || null;
    if (!baselineFileName) {
        return {};
    }
    return { baselineFileName, baselineEvaluation };
}
const link = (href, text) => `[${text}](${href})`;
exports.link = link;
const listItem = (text) => `- ${text}`;
exports.listItem = listItem;
const productTitle = () => "Accessibility scan";
const footerSeparator = () => `-------------------`;
exports.footerSeparator = footerSeparator;
const sectionSeparator = () => "\n";
exports.sectionSeparator = sectionSeparator;
function buildContent(combinedReportResult, baselineInfo) {
    const { results: { resultsByRule: { passed, notApplicable, failed }, urlResults: { passedUrls, unscannableUrls, failedUrls }, }, } = combinedReportResult;
    const baselinedEnabled = baselineInfo !== undefined;
    const lines = [
        ...(failed.length === 0 && !baselinedEnabled
            ? [headingWithMessage("all applicable checks passed")]
            : [headingWithMessage()]),
        ...(baselinedEnabled
            ? [
                fixedFailureDetails(baselineInfo),
                ...failureDetailsBaseline(combinedReportResult, baselineInfo),
                baselineDetails(baselineInfo),
                downloadArtifactsWithLink(combinedReportResult, baselineInfo.baselineEvaluation),
                (0, exports.sectionSeparator)(),
                (0, exports.sectionSeparator)(),
                "## Scan summary",
                (0, exports.sectionSeparator)(),
                (0, exports.sectionSeparator)(),
                urlsListItem(passedUrls, unscannableUrls, failedUrls, baselinedEnabled),
                (0, exports.sectionSeparator)(),
                rulesListItem(passed.length, notApplicable.length, failed.length, baselinedEnabled),
                (0, exports.sectionSeparator)(),
            ]
            : [
                (0, exports.sectionSeparator)(),
                (0, exports.sectionSeparator)(),
                urlsListItem(passedUrls, unscannableUrls, failedUrls),
                (0, exports.sectionSeparator)(),
                rulesListItem(passed.length, notApplicable.length, failed.length),
                downloadArtifactsWithLink(combinedReportResult),
                (0, exports.sectionSeparator)(),
                failureDetails(combinedReportResult),
            ]),
    ].join("");
    return scanResultDetails(lines, scanResultFooter(combinedReportResult));
}
exports.buildContent = buildContent;
function headingWithMessage(message) {
    return `# ${productTitle()}${message ? `: ${message}` : ""}`;
}
function baselineDetails(baselineInfo) {
    const { baselineFileName, baselineEvaluation } = baselineInfo;
    const baselineNotDetectedHelpText = `To update the baseline with these changes, copy the updated baseline file to ${(0, exports.link)("LINK TO ARTIFACT", "scan arguments")}.`;
    if (baselineFileName === undefined) {
        return [(0, exports.sectionSeparator)(), "- Baseline not configured"].join("");
    }
    if (baselineEvaluation === undefined) {
        return [`- Baseline not detected ${baselineNotDetectedHelpText}`].join("");
    }
    const { totalNewViolations, totalBaselineViolations } = baselineEvaluation;
    if (totalBaselineViolations === undefined ||
        (totalBaselineViolations === 0 && totalNewViolations > 0)) {
        return [
            "Baseline not detected",
            (0, exports.sectionSeparator)(),
            baselineNotDetectedHelpText,
        ].join("");
    }
    const shouldUpdate = shouldUpdateBaselineFile(baselineEvaluation);
    if (totalBaselineViolations > 0 || shouldUpdate) {
        return [
            (0, exports.sectionSeparator)(),
            `- ${totalBaselineViolations} failure instances in baseline (Not shown${shouldUpdate ? ". You should update the baseline." : ""})`,
        ].join("");
    }
    return "";
}
function shouldUpdateBaselineFile(baselineEvaluation) {
    return baselineEvaluation && baselineEvaluation.suggestedBaselineUpdate
        ? true
        : false;
}
function hasFixedFailureResults(baselineEvaluation) {
    if (baselineEvaluation && baselineEvaluation.fixedViolationsByRule) {
        for (const _ in baselineEvaluation.fixedViolationsByRule) {
            return true;
        }
    }
    return false;
}
const urlsListItem = (passedUrls, unscannableUrls, failedUrls, baselinedEnabled = false) => {
    const failedUrlsSummary = `${failedUrls} URL(s) failed, `;
    const passedAndUnscannableUrlsSummary = `${passedUrls} URL(s) passed, and ${unscannableUrls} were not scannable`;
    const urlsSummary = failedUrls === 0 && !baselinedEnabled
        ? passedAndUnscannableUrlsSummary
        : failedUrlsSummary.concat(passedAndUnscannableUrlsSummary);
    return (0, exports.listItem)(`${`URLs`}: ${urlsSummary}`);
};
const rulesListItem = (passedChecks, inapplicableChecks, failedChecks, baselinedEnabled = false) => {
    const failedRulesSummary = `${failedChecks} check(s) failed, `;
    const passedAndInapplicableRulesSummary = `${passedChecks} check(s) passed, and ${inapplicableChecks} were not applicable`;
    const rulesSummary = failedChecks === 0 && !baselinedEnabled
        ? passedAndInapplicableRulesSummary
        : failedRulesSummary.concat(passedAndInapplicableRulesSummary);
    return (0, exports.listItem)(`${`Rules`}: ${rulesSummary}`);
};
const failureDetails = (combinedReportResult) => {
    if (combinedReportResult.results.resultsByRule.failed.length === 0) {
        return "";
    }
    const failedRulesList = combinedReportResult.results.resultsByRule.failed.map((failuresGroup) => {
        const failureCount = failuresGroup.failed.length;
        const ruleId = failuresGroup.failed[0].rule.ruleId;
        const ruleDescription = failuresGroup.failed[0].rule.description;
        return [
            failedRuleListItem(failureCount, ruleId, ruleDescription),
            (0, exports.sectionSeparator)(),
        ].join("");
    });
    return [
        (0, exports.sectionSeparator)(),
        (0, exports.sectionSeparator)(),
        "## Failed instances",
        (0, exports.sectionSeparator)(),
        (0, exports.sectionSeparator)(),
        ...failedRulesList,
    ].join("");
};
const failedRuleListItem = (failureCount, ruleId, description) => {
    return (0, exports.listItem)(`${`${failureCount} × ${ruleId}`}:  ${description}`);
};
function fixedFailureDetails({ baselineEvaluation }) {
    if (!hasFixedFailureResults(baselineEvaluation)) {
        return (0, exports.sectionSeparator)();
    }
    let totalFixedFailureInstanceCount = 0;
    const fixedFailureInstanceLines = [];
    const { fixedViolationsByRule } = baselineEvaluation;
    for (const ruleId in fixedViolationsByRule) {
        const fixedFailureInstanceCount = fixedViolationsByRule[ruleId];
        totalFixedFailureInstanceCount += fixedFailureInstanceCount;
        fixedFailureInstanceLines.push([
            fixedRuleListItemBaseline(fixedFailureInstanceCount, ruleId),
            (0, exports.sectionSeparator)(),
        ].join(""));
    }
    const lines = [
        (0, exports.sectionSeparator)(),
        `- ${totalFixedFailureInstanceCount} failure instances from baseline no longer exist:`,
        (0, exports.sectionSeparator)(),
        ...fixedFailureInstanceLines,
    ];
    return lines.join("");
}
const failureDetailsBaseline = (combinedReportResult, baselineInfo) => {
    if (hasFailures(combinedReportResult, baselineInfo.baselineEvaluation) ||
        shouldUpdateBaselineFile(baselineInfo.baselineEvaluation)) {
        const failedRulesList = getFailedRulesList(combinedReportResult, baselineInfo.baselineEvaluation);
        const failureInstances = getFailureInstances(combinedReportResult, baselineInfo.baselineEvaluation);
        return [
            (0, exports.sectionSeparator)(),
            `- ${failureInstances} failure instances${baselineHasFailures(baselineInfo.baselineEvaluation)
                ? " not in baseline"
                : ""}`,
            ...failedRulesList,
        ].join("");
    }
    return [
        (0, exports.sectionSeparator)(),
        ...(baselineHasFailures(baselineInfo.baselineEvaluation)
            ? [
                `- No new failures`,
                (0, exports.sectionSeparator)(),
                `- No failures were detected by automatic scanning except those which exist in the baseline.`,
            ]
            : [
                `- No failures detected`,
                (0, exports.sectionSeparator)(),
                `- No failures were detected by automatic scanning.`,
            ]),
    ].join("");
};
const getTotalFailureInstancesFromResults = ({ results, }) => {
    return results.resultsByRule.failed.reduce((a, b) => a + b.failed.reduce((c, d) => c + d.urls.length, 0), 0);
};
const getFailureInstances = (combinedReportResult, baselineEvaluation) => {
    if (baselineEvaluation) {
        return baselineEvaluation.totalNewViolations;
    }
    return getTotalFailureInstancesFromResults(combinedReportResult);
};
const getFailedRulesList = (combinedReportResult, baselineEvaluation) => {
    if (baselineEvaluation) {
        return getNewFailuresList(combinedReportResult, baselineEvaluation);
    }
    return getFailedRulesListWithNoBaseline(combinedReportResult);
};
const getNewFailuresList = (combinedReportResult, { newViolationsByRule }) => {
    const newFailuresList = [];
    for (const ruleId in newViolationsByRule) {
        const failureCount = newViolationsByRule[ruleId];
        const ruleDescription = getRuleDescription(combinedReportResult, ruleId);
        newFailuresList.push([
            failedRuleListItemBaseline(failureCount, ruleId, ruleDescription),
            (0, exports.sectionSeparator)(),
        ].join(""));
    }
    return newFailuresList;
};
const getFailedRulesListWithNoBaseline = ({ results, }) => {
    return results.resultsByRule.failed.map(({ failed }) => {
        const failureCount = failed.reduce((a, b) => a + b.urls.length, 0);
        const { ruleId, description } = failed[0].rule;
        return [
            failedRuleListItemBaseline(failureCount, ruleId, description),
            (0, exports.sectionSeparator)(),
        ].join("");
    });
};
const getRuleDescription = ({ results }, ruleId) => {
    const matchingFailuresGroup = results.resultsByRule.failed.find((failuresGroup) => failuresGroup.failed[0].rule.ruleId === ruleId);
    return matchingFailuresGroup.failed[0].rule.description;
};
const failedRuleListItemBaseline = (failureCount, ruleId, description) => {
    return (0, exports.listItem)(`(${failureCount}) ${ruleId}: ${description}`);
};
const fixedRuleListItemBaseline = (failureCount, ruleId) => {
    return (0, exports.listItem)(`(${failureCount}) ${ruleId}`);
};
function scanResultDetails(scanResult, footer) {
    return [
        scanResult,
        (0, exports.sectionSeparator)(),
        (0, exports.footerSeparator)(),
        (0, exports.sectionSeparator)(),
        footer,
    ].join("");
}
function scanResultFooter({ axeVersion, userAgent, }) {
    return [
        (0, exports.sectionSeparator)(),
        `This scan used ${(0, exports.link)(`https://github.com/dequelabs/axe-core/releases/tag/v${axeVersion}`, `axe-core ${axeVersion}`)} with ${userAgent}.`,
        (0, exports.sectionSeparator)(),
    ].join("");
}
function downloadArtifactsWithLink(combinedReportResult, baselineEvaluation) {
    const details = !baselineHasFailures(baselineEvaluation) &&
        !hasFailures(combinedReportResult, baselineEvaluation)
        ? "scan details"
        : "all failures and scan details";
    return [
        (0, exports.sectionSeparator)(),
        `- To see ${details}, ${(0, exports.link)("#artifacts", "download the accessibility report")}`,
    ].join("");
}
const baselineHasFailures = (baselineEvaluation) => {
    return ((baselineEvaluation === null || baselineEvaluation === void 0 ? void 0 : baselineEvaluation.totalBaselineViolations) &&
        (baselineEvaluation === null || baselineEvaluation === void 0 ? void 0 : baselineEvaluation.totalBaselineViolations) > 0);
};
const hasFailures = (combinedReportResult, baselineEvaluation) => {
    if (baselineEvaluation !== undefined) {
        return baselineEvaluation.totalNewViolations > 0;
    }
    return getTotalFailureInstancesFromResults(combinedReportResult) > 0;
};
