import { inject, injectable } from "inversify";
import {
  AICombinedReportDataConverter,
  AICrawler,
  BaselineFileUpdater,
  BaselineOptionsBuilder,
  CombinedScanResult,
  CrawlerParametersBuilder,
  ScanArguments,
} from "accessibility-insights-scan";
import { CombinedReportParameters } from "accessibility-insights-report";
import { AxeInfo } from "./axe-info";
import { ConsolidatedReportGenerator } from "./report";
import {
  setFailed,
  getInput,
  info,
  summary,
  getBooleanInput,
} from "@actions/core";
import { markdownSummary } from "./summary";

@injectable()
export class Scanner {
  private scanSucceeded = true;

  constructor(
    @inject(AICrawler) private readonly crawler: AICrawler,
    @inject(CrawlerParametersBuilder)
    private readonly crawlerParametersBuilder: CrawlerParametersBuilder,
    @inject(AxeInfo) private readonly axeInfo: AxeInfo,
    @inject(AICombinedReportDataConverter)
    private readonly combinedReportDataConverter: AICombinedReportDataConverter,
    @inject(ConsolidatedReportGenerator)
    private readonly reportGenerator: ConsolidatedReportGenerator,
    @inject(BaselineOptionsBuilder)
    private readonly baselineOptionsBuilder: BaselineOptionsBuilder,
    @inject(BaselineFileUpdater)
    private readonly baselineFileUpdater: BaselineFileUpdater
  ) {}

  private async invokeScan(): Promise<boolean> {
    let scanArguments: ScanArguments;
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

      const crawlerParameters =
        this.crawlerParametersBuilder.build(scanArguments);
      const baselineParameters =
        this.baselineOptionsBuilder.build(scanArguments);

      const scanStarted = new Date();
      const combinedScanResult = await this.crawler.crawl(
        crawlerParameters,
        baselineParameters
      );

      const scanEnded = new Date();

      const combinedReportParameters = this.getCombinedReportParameters(
        combinedScanResult,
        scanStarted,
        scanEnded
      );

      this.reportGenerator.generateReport(combinedReportParameters);

      await this.baselineFileUpdater.updateBaseline(
        scanArguments,
        combinedScanResult.baselineEvaluation
      );

      if (baselineFile !== null) {
        if (
          combinedScanResult.baselineEvaluation?.suggestedBaselineUpdate &&
          inputUrls.length === 0
        ) {
          setFailed("The baseline file does not match scan results.");
          await this.failRun();
        }
        if (
          inputUrls.length > 0 &&
          combinedReportParameters.results.urlResults.failedUrls > 0
        ) {
          setFailed(
            "Accessibility error(s) were found. The baseline file does not match scan results."
          );
          await this.failRun();
        }
      } else {
        if (combinedReportParameters.results.urlResults.failedUrls > 0) {
          setFailed("Accessibility error(s) were found");
          await this.failRun();
        }
      }

      const reportMarkdown = markdownSummary(
        combinedReportParameters,
        combinedScanResult.baselineEvaluation
      );

      await summary.addRaw(reportMarkdown).write();

      return Promise.resolve(this.scanSucceeded);
    } catch (error) {
      setFailed(error);
    } finally {
      info(`Accessibility scanning of URL ${scanArguments?.url} completed`);
    }

    return Promise.resolve(false);
  }

  public async failRun(): Promise<void> {
    this.scanSucceeded = false;
  }

  private getCombinedReportParameters(
    combinedScanResult: CombinedScanResult,
    scanStarted: Date,
    scanEnded: Date
  ): CombinedReportParameters {
    const scanResultData = {
      baseUrl: combinedScanResult.scanMetadata.baseUrl ?? "n/a",
      basePageTitle: combinedScanResult.scanMetadata.basePageTitle,
      scanEngineName: "accessibility-scan-action",
      axeCoreVersion: this.axeInfo.version,
      browserUserAgent: combinedScanResult.scanMetadata.userAgent,
      urlCount: combinedScanResult.urlCount,
      scanStarted,
      scanEnded,
      browserResolution: combinedScanResult.scanMetadata.browserResolution,
    };

    return this.combinedReportDataConverter.convertCrawlingResults(
      combinedScanResult.combinedAxeResults,
      scanResultData
    );
  }

  public async scan(): Promise<boolean> {
    return await this.invokeScan();
  }
}
