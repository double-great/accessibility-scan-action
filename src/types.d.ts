// https://github.com/microsoft/TypeScript/issues/46907#issuecomment-1001080601
declare namespace Intl {
  class ListFormat {
    constructor(locales?: string | string[], options?: ListFormatOptions);
    format(values: unknown[]): string;
    formatToParts(values: unknown[]): ListFormatPart[];
    supportedLocalesOf(
      locales: string | string[],
      options?: ListFormatOptions
    ): string[];
  }
}
