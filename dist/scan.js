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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from "inversify";
import pkg from "accessibility-insights-scan";
const { CrawlerParametersBuilder, AICombinedReportDataConverter, AICrawler, BaselineFileUpdater, BaselineOptionsBuilder, } = pkg;
import axe from "axe-core";
import { ConsolidatedReportGenerator } from "./report.js";
import { setFailed, getInput, info, summary, getBooleanInput, setOutput, } from "@actions/core";
import { markdownSummary } from "./summary/index.js";
let Scanner = class Scanner {
    crawler;
    crawlerParametersBuilder;
    combinedReportDataConverter;
    reportGenerator;
    baselineOptionsBuilder;
    baselineFileUpdater;
    scanSucceeded = true;
    constructor(crawler, crawlerParametersBuilder, combinedReportDataConverter, reportGenerator, baselineOptionsBuilder, baselineFileUpdater) {
        this.crawler = crawler;
        this.crawlerParametersBuilder = crawlerParametersBuilder;
        this.combinedReportDataConverter = combinedReportDataConverter;
        this.reportGenerator = reportGenerator;
        this.baselineOptionsBuilder = baselineOptionsBuilder;
        this.baselineFileUpdater = baselineFileUpdater;
    }
    async invokeScan() {
        let scanArguments;
        try {
            const baselineFile = getInput("baselineFile") || null;
            const inputUrls = getInput("inputUrls")
                ? getInput("inputUrls").split(",")
                : [];
            scanArguments = {
                url: getInput("url"),
                crawl: true,
                singleWorker: true,
                restart: true,
                maxUrls: Number(getInput("maxUrls")),
                baselineFile,
                output: getInput("outDir") || "_accessibility-reports",
                ...(inputUrls.length > 0 && { inputUrls }),
                snapshot: getBooleanInput("snapshot"),
            };
            const crawlerParameters = this.crawlerParametersBuilder.build(scanArguments);
            const baselineParameters = this.baselineOptionsBuilder.build(scanArguments);
            const scanStarted = new Date();
            const combinedScanResult = await this.crawler.crawl(crawlerParameters, baselineParameters);
            const scanEnded = new Date();
            const combinedReportParameters = this.getCombinedReportParameters(combinedScanResult, scanStarted, scanEnded);
            this.reportGenerator.generateReport(combinedReportParameters);
            await this.baselineFileUpdater.updateBaseline(scanArguments, combinedScanResult.baselineEvaluation);
            if (baselineFile !== null) {
                if (combinedScanResult.baselineEvaluation?.suggestedBaselineUpdate &&
                    inputUrls.length === 0) {
                    setFailed("The baseline file does not match scan results.");
                    await this.failRun();
                }
                if (inputUrls.length > 0 &&
                    combinedReportParameters.results.urlResults.failedUrls > 0) {
                    setFailed("Accessibility error(s) were found. The baseline file does not match scan results.");
                    await this.failRun();
                }
            }
            else {
                if (combinedReportParameters.results.urlResults.failedUrls > 0) {
                    setFailed("Accessibility error(s) were found");
                    await this.failRun();
                }
            }
            const reportMarkdown = markdownSummary(combinedReportParameters, combinedScanResult.baselineEvaluation);
            await summary.addRaw(reportMarkdown).write();
            setOutput("summary-report", reportMarkdown);
            return Promise.resolve(this.scanSucceeded);
        }
        catch (error) {
            setFailed(error);
        }
        finally {
            info(`Accessibility scanning of URL ${scanArguments?.url} completed`);
        }
        return Promise.resolve(false);
    }
    async failRun() {
        this.scanSucceeded = false;
    }
    getCombinedReportParameters(combinedScanResult, scanStarted, scanEnded) {
        const scanResultData = {
            baseUrl: combinedScanResult.scanMetadata.baseUrl ?? "n/a",
            basePageTitle: combinedScanResult.scanMetadata.basePageTitle,
            scanEngineName: "accessibility-scan-action",
            axeCoreVersion: axe.version,
            browserUserAgent: combinedScanResult.scanMetadata.userAgent,
            urlCount: combinedScanResult.urlCount,
            scanStarted,
            scanEnded,
            browserResolution: combinedScanResult.scanMetadata.browserResolution,
        };
        return this.combinedReportDataConverter.convertCrawlingResults(combinedScanResult.combinedAxeResults, scanResultData);
    }
    async scan() {
        return await this.invokeScan();
    }
};
Scanner = __decorate([
    injectable(),
    __param(0, inject(AICrawler)),
    __param(1, inject(CrawlerParametersBuilder)),
    __param(2, inject(AICombinedReportDataConverter)),
    __param(3, inject(ConsolidatedReportGenerator)),
    __param(4, inject(BaselineOptionsBuilder)),
    __param(5, inject(BaselineFileUpdater)),
    __metadata("design:paramtypes", [AICrawler,
        CrawlerParametersBuilder,
        AICombinedReportDataConverter,
        ConsolidatedReportGenerator,
        BaselineOptionsBuilder,
        BaselineFileUpdater])
], Scanner);
export { Scanner };
