import axe from "axe-core";
import { injectable } from "inversify";

@injectable()
export class AxeInfo {
  public get version() {
    return axe.version;
  }
}
