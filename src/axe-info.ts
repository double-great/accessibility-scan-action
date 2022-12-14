import Axe from "axe-core";
import { injectable } from "inversify";

@injectable()
export class AxeInfo {
  constructor(private readonly axe: typeof Axe = Axe) {}

  public get version(): string {
    return this.axe.version;
  }
}
