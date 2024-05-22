import { DOMParser } from "xmldom";
import { IHTMLInfo } from "./IHTMLInfo";

export class HTMLInfo implements IHTMLInfo {
  private _document: Document | undefined;

  constructor(private html: string) {}

  findValueByClassName(
    className: string,
    index: number | undefined = 0
  ): string {
    return (
      (
        this.document.getElementsByClassName(className)[index]
          ?.childNodes[0] as any
      )?.data ?? ""
    );
  }

  findValueByClassNameAndProp(
    className: string,
    propName: string,
    index: number | undefined = 0
  ): string {
    return (
      this.document
        .getElementsByClassName(className)
        [index]?.getAttribute(propName) ?? ""
    );
  }

  getNumberElementsByClassName(className: string): number {
    return this.document.getElementsByClassName(className)?.length ?? 0;
  }

  private get document(): Document {
    if (!this._document) {
      const parser = new DOMParser();
      this._document = parser.parseFromString(this.html, "text/html");
    }
    return this._document;
  }
}
