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
import { getInput, setOutput } from "@actions/core";
import { inject, injectable } from "inversify";
import { writeFileSync, existsSync, mkdirSync } from "fs";
export const iocTypes = {
    ReportFactory: "ReportFactory",
};
let ConsolidatedReportGenerator = class ConsolidatedReportGenerator {
    reporterFactoryFunc;
    constructor(reporterFactoryFunc) {
        this.reporterFactoryFunc = reporterFactoryFunc;
    }
    generateReport(combinedReportData) {
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
        setOutput("summary-report", htmlReportContent);
        return reportFileName;
    }
    saveHtmlReport(fileName, content) {
        writeFileSync(fileName, content);
    }
};
ConsolidatedReportGenerator = __decorate([
    injectable(),
    __param(0, inject(iocTypes.ReportFactory)),
    __metadata("design:paramtypes", [Function])
], ConsolidatedReportGenerator);
export { ConsolidatedReportGenerator };
