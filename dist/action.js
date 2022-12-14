"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.action = exports.iocTypes = void 0;
require("reflect-metadata");
const inversify = __importStar(require("inversify"));
const scan_1 = require("./scan");
const accessibility_insights_scan_1 = require("accessibility-insights-scan");
const accessibility_insights_report_1 = require("accessibility-insights-report");
const core_1 = require("@actions/core");
exports.iocTypes = {
    ReportFactory: "ReportFactory",
};
function action() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const container = new inversify.Container({
                autoBindInjectable: true,
            });
            (0, accessibility_insights_scan_1.setupCliContainer)(container);
            container.bind(exports.iocTypes.ReportFactory).toConstantValue(accessibility_insights_report_1.reporterFactory);
            container.bind(scan_1.Scanner).toSelf().inSingletonScope();
            const scanner = container.get(scan_1.Scanner);
            yield scanner.scan();
        }
        catch (error) {
            (0, core_1.setFailed)(error);
            return;
        }
    });
}
exports.action = action;
