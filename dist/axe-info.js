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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxeInfo = void 0;
const axe_core_1 = __importDefault(require("axe-core"));
const inversify_1 = require("inversify");
let AxeInfo = exports.AxeInfo = class AxeInfo {
    constructor(axe = axe_core_1.default) {
        this.axe = axe;
    }
    get version() {
        return this.axe.version;
    }
};
exports.AxeInfo = AxeInfo = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [Object])
], AxeInfo);
