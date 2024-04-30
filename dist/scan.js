"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scanner = void 0;
const inversify_1 = require("inversify");
const accessibility_insights_scan_1 = require("accessibility-insights-scan");
const axe_info_1 = require("./axe-info");
const report_1 = require("./report");
const core_1 = require("@actions/core");
const summary_1 = require("./summary");
let Scanner = class Scanner {
    constructor(crawler, crawlerParametersBuilder, axeInfo, combinedReportDataConverter, reportGenerator, baselineOptionsBuilder, baselineFileUpdater) {
        this.crawler = crawler;
        this.crawlerParametersBuilder = crawlerParametersBuilder;
        this.axeInfo = axeInfo;
        this.combinedReportDataConverter = combinedReportDataConverter;
        this.reportGenerator = reportGenerator;
        this.baselineOptionsBuilder = baselineOptionsBuilder;
        this.baselineFileUpdater = baselineFileUpdater;
        this.scanSucceeded = true;
    }
    invokeScan() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let scanArguments;
            try {
                const baselineFile = (0, core_1.getInput)("baselineFile") || null;
                const inputUrls = (0, core_1.getInput)("inputUrls")
                    ? (0, core_1.getInput)("inputUrls").split(",")
                    : [];
                scanArguments = Object.assign(Object.assign({ url: (0, core_1.getInput)("url"), crawl: true, singleWorker: true, restart: true, maxUrls: Number((0, core_1.getInput)("maxUrls")), baselineFile, output: (0, core_1.getInput)("outDir") || "_accessibility-reports" }, (inputUrls.length > 0 && { inputUrls })), { snapshot: (0, core_1.getBooleanInput)("snapshot") });
                const crawlerParameters = this.crawlerParametersBuilder.build(scanArguments);
                const baselineParameters = this.baselineOptionsBuilder.build(scanArguments);
                const scanStarted = new Date();
                const combinedScanResult = yield this.crawler.crawl(crawlerParameters, baselineParameters);
                const scanEnded = new Date();
                const combinedReportParameters = this.getCombinedReportParameters(combinedScanResult, scanStarted, scanEnded);
                this.reportGenerator.generateReport(combinedReportParameters);
                yield this.baselineFileUpdater.updateBaseline(scanArguments, combinedScanResult.baselineEvaluation);
                if (baselineFile !== null) {
                    if (((_a = combinedScanResult.baselineEvaluation) === null || _a === void 0 ? void 0 : _a.suggestedBaselineUpdate) &&
                        inputUrls.length === 0) {
                        (0, core_1.setFailed)("The baseline file does not match scan results.");
                        yield this.failRun();
                    }
                    if (inputUrls.length > 0 &&
                        combinedReportParameters.results.urlResults.failedUrls > 0) {
                        (0, core_1.setFailed)("Accessibility error(s) were found. The baseline file does not match scan results.");
                        yield this.failRun();
                    }
                }
                else {
                    if (combinedReportParameters.results.urlResults.failedUrls > 0) {
                        (0, core_1.setFailed)("Accessibility error(s) were found");
                        yield this.failRun();
                    }
                }
                const reportMarkdown = (0, summary_1.markdownSummary)(combinedReportParameters, combinedScanResult.baselineEvaluation);
                yield core_1.summary.addRaw(reportMarkdown).write();
                return Promise.resolve(this.scanSucceeded);
            }
            catch (error) {
                (0, core_1.setFailed)(error);
            }
            finally {
                (0, core_1.info)(`Accessibility scanning of URL ${scanArguments === null || scanArguments === void 0 ? void 0 : scanArguments.url} completed`);
            }
            return Promise.resolve(false);
        });
    }
    failRun() {
        return __awaiter(this, void 0, void 0, function* () {
            this.scanSucceeded = false;
        });
    }
    getCombinedReportParameters(combinedScanResult, scanStarted, scanEnded) {
        var _a;
        const scanResultData = {
            baseUrl: (_a = combinedScanResult.scanMetadata.baseUrl) !== null && _a !== void 0 ? _a : "n/a",
            basePageTitle: combinedScanResult.scanMetadata.basePageTitle,
            scanEngineName: "accessibility-scan-action",
            axeCoreVersion: this.axeInfo.version,
            browserUserAgent: combinedScanResult.scanMetadata.userAgent,
            urlCount: combinedScanResult.urlCount,
            scanStarted,
            scanEnded,
            browserResolution: combinedScanResult.scanMetadata.browserResolution,
        };
        return this.combinedReportDataConverter.convertCrawlingResults(combinedScanResult.combinedAxeResults, scanResultData);
    }
    scan() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.invokeScan();
        });
    }
};
exports.Scanner = Scanner;
exports.Scanner = Scanner = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(accessibility_insights_scan_1.AICrawler)),
    __param(1, (0, inversify_1.inject)(accessibility_insights_scan_1.CrawlerParametersBuilder)),
    __param(2, (0, inversify_1.inject)(axe_info_1.AxeInfo)),
    __param(3, (0, inversify_1.inject)(accessibility_insights_scan_1.AICombinedReportDataConverter)),
    __param(4, (0, inversify_1.inject)(report_1.ConsolidatedReportGenerator)),
    __param(5, (0, inversify_1.inject)(accessibility_insights_scan_1.BaselineOptionsBuilder)),
    __param(6, (0, inversify_1.inject)(accessibility_insights_scan_1.BaselineFileUpdater)),
    __metadata("design:paramtypes", [accessibility_insights_scan_1.AICrawler,
        accessibility_insights_scan_1.CrawlerParametersBuilder,
        axe_info_1.AxeInfo,
        accessibility_insights_scan_1.AICombinedReportDataConverter,
        report_1.ConsolidatedReportGenerator,
        accessibility_insights_scan_1.BaselineOptionsBuilder,
        accessibility_insights_scan_1.BaselineFileUpdater])
], Scanner);
