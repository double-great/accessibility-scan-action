import "reflect-metadata";

import * as inversify from "inversify";
import { Scanner } from "./scan";
import { setupCliContainer } from "accessibility-insights-scan";
import { reporterFactory } from "accessibility-insights-report";
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
