import { DOMParser } from "xmldom";
import { IHTMLDocument } from "./IHTMLDocument";

export class HTMLDocument implements IHTMLDocument {
  private _document: Document | undefined = undefined;
  constructor(private html: string) {}

  get document(): Document {
    if (this._document === undefined) {
      const parser = new DOMParser();
      this._document = parser.parseFromString(this.html, "text/html");
    }

    return this._document;
  }

  findByClassName(className: string): HTMLCollectionOf<Element> {
    return this.document.getElementsByClassName(className);
  }
}
