"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasFailures = exports.baselineHasFailures = exports.failedRuleListItemBaseline = exports.getRuleDescription = exports.getFailedRulesListWithNoBaseline = exports.getNewFailuresList = exports.getFailedRulesList = exports.getFailureInstances = exports.getTotalFailureInstancesFromResults = exports.failureDetailsBaseline = exports.failedRuleListItem = exports.rulesListItem = exports.urlsListItem = exports.listItem = exports.link = void 0;
exports.getBaselineInfo = getBaselineInfo;
exports.headingWithMessage = headingWithMessage;
exports.baselineDetails = baselineDetails;
exports.shouldUpdateBaselineFile = shouldUpdateBaselineFile;
exports.hasFixedFailureResults = hasFixedFailureResults;
exports.fixedFailureDetails = fixedFailureDetails;
exports.downloadArtifactsWithLink = downloadArtifactsWithLink;
const core_1 = require("@actions/core");
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
function headingWithMessage(message) {
    return `# Accessibility scan${message ? `: ${message}` : ""}`;
}
function baselineDetails(baselineInfo) {
    const { baselineFileName, baselineEvaluation } = baselineInfo;
    if (baselineFileName === undefined) {
        return ["- Baseline not configured"];
    }
    if (baselineEvaluation === undefined) {
        return [`- Baseline not detected`];
    }
    const { totalNewViolations, totalBaselineViolations } = baselineEvaluation;
    if (totalBaselineViolations === undefined ||
        (totalBaselineViolations === 0 && totalNewViolations > 0)) {
        return [`- Baseline not detected`];
    }
    const shouldUpdate = shouldUpdateBaselineFile(baselineEvaluation);
    if (totalBaselineViolations > 0 || shouldUpdate) {
        return [
            `- ${totalBaselineViolations} failure instance(s) in baseline, not shown.${shouldUpdate ? " You should update the baseline." : ""}`,
        ];
    }
    return [];
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
exports.urlsListItem = urlsListItem;
const rulesListItem = (passedChecks, inapplicableChecks, failedChecks, baselinedEnabled = false) => {
    const failedRulesSummary = `${failedChecks} check(s) failed, `;
    const passedAndInapplicableRulesSummary = `${passedChecks} check(s) passed, and ${inapplicableChecks} were not applicable`;
    const rulesSummary = failedChecks === 0 && !baselinedEnabled
        ? passedAndInapplicableRulesSummary
        : failedRulesSummary.concat(passedAndInapplicableRulesSummary);
    return (0, exports.listItem)(`${`Rules`}: ${rulesSummary}`);
};
exports.rulesListItem = rulesListItem;
const failedRuleListItem = (failureCount, ruleId, description) => {
    return (0, exports.listItem)(`${`${failureCount} × ${ruleId}`}:  ${description}`);
};
exports.failedRuleListItem = failedRuleListItem;
function fixedFailureDetails({ baselineEvaluation, }) {
    if (!hasFixedFailureResults(baselineEvaluation)) {
        return [];
    }
    let count = 0;
    const fixedFailureInstanceLines = [];
    const { fixedViolationsByRule } = baselineEvaluation;
    for (const ruleId in fixedViolationsByRule) {
        const fixedFailureInstanceCount = fixedViolationsByRule[ruleId];
        count += fixedFailureInstanceCount;
        fixedFailureInstanceLines.push(`    - (${fixedFailureInstanceCount}) ${ruleId}`);
    }
    return [
        `- ${count} failure instance(s) from baseline no longer exist:
${fixedFailureInstanceLines.join("\n")}`,
    ];
}
const failureDetailsBaseline = (combinedReportResult, baselineInfo) => {
    if ((0, exports.hasFailures)(combinedReportResult, baselineInfo.baselineEvaluation) ||
        shouldUpdateBaselineFile(baselineInfo.baselineEvaluation)) {
        const failedRulesList = (0, exports.getFailedRulesList)(combinedReportResult, baselineInfo.baselineEvaluation);
        const failureInstances = (0, exports.getFailureInstances)(combinedReportResult, baselineInfo.baselineEvaluation);
        return [
            `- ${failureInstances} failure instance(s)${(0, exports.baselineHasFailures)(baselineInfo.baselineEvaluation)
                ? " not in baseline"
                : ""}`,
            ...failedRulesList,
        ];
    }
    return (0, exports.baselineHasFailures)(baselineInfo.baselineEvaluation)
        ? [
            `- - No failures were detected by automatic scanning except those which exist in the baseline.`,
        ]
        : [`- - No failures were detected by automatic scanning.`];
};
exports.failureDetailsBaseline = failureDetailsBaseline;
const getTotalFailureInstancesFromResults = ({ results, }) => {
    return results.resultsByRule.failed.reduce((a, b) => a + b.failed.reduce((c, d) => c + d.urls.length, 0), 0);
};
exports.getTotalFailureInstancesFromResults = getTotalFailureInstancesFromResults;
const getFailureInstances = (combinedReportResult, baselineEvaluation) => {
    if (baselineEvaluation) {
        return baselineEvaluation.totalNewViolations;
    }
    return (0, exports.getTotalFailureInstancesFromResults)(combinedReportResult);
};
exports.getFailureInstances = getFailureInstances;
const getFailedRulesList = (combinedReportResult, baselineEvaluation) => {
    if (baselineEvaluation) {
        return (0, exports.getNewFailuresList)(combinedReportResult, baselineEvaluation);
    }
    return (0, exports.getFailedRulesListWithNoBaseline)(combinedReportResult);
};
exports.getFailedRulesList = getFailedRulesList;
const getNewFailuresList = (combinedReportResult, { newViolationsByRule }) => {
    const newFailuresList = [];
    for (const ruleId in newViolationsByRule) {
        const failureCount = newViolationsByRule[ruleId];
        const ruleDescription = (0, exports.getRuleDescription)(combinedReportResult, ruleId);
        newFailuresList.push([(0, exports.failedRuleListItemBaseline)(failureCount, ruleId, ruleDescription)].join(""));
    }
    return newFailuresList;
};
exports.getNewFailuresList = getNewFailuresList;
const getFailedRulesListWithNoBaseline = ({ results, }) => {
    return results.resultsByRule.failed.map(({ failed }) => {
        const failureCount = failed.reduce((a, b) => a + b.urls.length, 0);
        const { ruleId, description } = failed[0].rule;
        return [(0, exports.failedRuleListItemBaseline)(failureCount, ruleId, description)].join("");
    });
};
exports.getFailedRulesListWithNoBaseline = getFailedRulesListWithNoBaseline;
const getRuleDescription = ({ results }, ruleId) => {
    const matchingFailuresGroup = results.resultsByRule.failed.find((failuresGroup) => failuresGroup.failed[0].rule.ruleId === ruleId);
    return matchingFailuresGroup.failed[0].rule.description;
};
exports.getRuleDescription = getRuleDescription;
const failedRuleListItemBaseline = (failureCount, ruleId, description) => {
    return (0, exports.listItem)(`(${failureCount}) ${ruleId}: ${description}`);
};
exports.failedRuleListItemBaseline = failedRuleListItemBaseline;
function downloadArtifactsWithLink(combinedReportResult, baselineEvaluation) {
    const details = !(0, exports.baselineHasFailures)(baselineEvaluation) &&
        !(0, exports.hasFailures)(combinedReportResult, baselineEvaluation)
        ? "scan details"
        : "all failures and scan details";
    return [
        `To see ${details}, ${(0, exports.link)("#artifacts", "download the accessibility report")}.`,
    ];
}
const baselineHasFailures = (baselineEvaluation) => {
    return ((baselineEvaluation === null || baselineEvaluation === void 0 ? void 0 : baselineEvaluation.totalBaselineViolations) &&
        (baselineEvaluation === null || baselineEvaluation === void 0 ? void 0 : baselineEvaluation.totalBaselineViolations) > 0);
};
exports.baselineHasFailures = baselineHasFailures;
const hasFailures = (combinedReportResult, baselineEvaluation) => {
    if (baselineEvaluation !== undefined) {
        return baselineEvaluation.totalNewViolations > 0;
    }
    return (0, exports.getTotalFailureInstancesFromResults)(combinedReportResult) > 0;
};
exports.hasFailures = hasFailures;
