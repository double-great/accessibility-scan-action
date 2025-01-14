import "reflect-metadata";

import * as inversify from "inversify";
import { Scanner } from "./scan.js";
import scanPkg from "accessibility-insights-scan";
const { setupCliContainer } = scanPkg;
import pkg from "accessibility-insights-report";
const { reporterFactory } = pkg;
import { setFailed } from "@actions/core";

export const iocTypes = {
  ReportFactory: "ReportFactory",
};

export async function action() {
  try {
    const container = new inversify.Container({
      autoBindInjectable: true,
    });

    setupCliContainer(container);

    container.bind(iocTypes.ReportFactory).toConstantValue(reporterFactory);
    container.bind(Scanner).toSelf().inSingletonScope();

    const scanner = container.get(Scanner);
    await scanner.scan();
  } catch (error) {
    setFailed(error);
    return;
  }
}
