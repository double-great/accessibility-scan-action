import { getInput } from "@actions/core";
import {
  ReporterFactory,
  CombinedReportParameters,
} from "accessibility-insights-report";
import { inject, injectable } from "inversify";
import { writeFileSync, existsSync, mkdirSync } from "fs";

export const iocTypes = {
  ReportFactory: "ReportFactory",
};

@injectable()
export class ConsolidatedReportGenerator {
  constructor(
    @inject(iocTypes.ReportFactory)
    private readonly reporterFactoryFunc: ReporterFactory
  ) {}

  public generateReport(combinedReportData: CombinedReportParameters): string {
    const reporter = this.reporterFactoryFunc();
    const htmlReportContent = reporter
      .fromCombinedResults(combinedReportData)
      .asHTML();

    const outDirectory = getInput("outDir") || "_accessibility-reports";

    if (!existsSync(outDirectory)) {
      mkdirSync(outDirectory);
    }
    const reportFileName = `${outDirectory}/index.html`;

    this.saveHtmlReport(reportFileName, htmlReportContent);

    return reportFileName;
  }

  private saveHtmlReport(fileName: string, content: string): void {
    writeFileSync(fileName, content);
  }
}
