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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsolidatedReportGenerator = exports.iocTypes = void 0;
const core_1 = require("@actions/core");
const inversify_1 = require("inversify");
const fs_1 = require("fs");
exports.iocTypes = {
    ReportFactory: "ReportFactory",
};
let ConsolidatedReportGenerator = class ConsolidatedReportGenerator {
    constructor(reporterFactoryFunc) {
        this.reporterFactoryFunc = reporterFactoryFunc;
    }
    generateReport(combinedReportData) {
        const reporter = this.reporterFactoryFunc();
        const htmlReportContent = reporter
            .fromCombinedResults(combinedReportData)
            .asHTML();
        const outDirectory = (0, core_1.getInput)("outDir") || "_accessibility-reports";
        if (!(0, fs_1.existsSync)(outDirectory)) {
            (0, fs_1.mkdirSync)(outDirectory);
        }
        const reportFileName = `${outDirectory}/index.html`;
        this.saveHtmlReport(reportFileName, htmlReportContent);
        return reportFileName;
    }
    saveHtmlReport(fileName, content) {
        (0, fs_1.writeFileSync)(fileName, content);
    }
};
exports.ConsolidatedReportGenerator = ConsolidatedReportGenerator;
exports.ConsolidatedReportGenerator = ConsolidatedReportGenerator = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(exports.iocTypes.ReportFactory)),
    __metadata("design:paramtypes", [Function])
], ConsolidatedReportGenerator);
