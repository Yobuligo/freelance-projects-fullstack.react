import { HTMLSearch } from "../htmlSearch/HTMLSearch";
import { IHTMLSearch } from "../htmlSearch/IHTMLSearch";
import { IHTMLElement } from "./IHTMLElement";

export class HTMLElement implements IHTMLElement {
  private _htmlSearch: IHTMLSearch | undefined;

  constructor(readonly origin: Element) {}

  attribute(name: string, value: any): IHTMLSearch {
    this.htmlSearch.attribute(name, value);
    return this.htmlSearch;
  }

  className(className: string): IHTMLSearch {
    this.htmlSearch.className(className);
    return this.htmlSearch;
  }

  indexFinding(index: number): IHTMLSearch {
    this.htmlSearch.indexFinding(index);
    return this.htmlSearch;
  }

  find(): IHTMLElement[] {
    return this.htmlSearch.find();
  }

  findAt(index: number): IHTMLElement | undefined {
    return this.htmlSearch.findAt(index);
  }

  first(): IHTMLElement | undefined {
    return this.htmlSearch.first();
  }

  firstAttrValue(name: string): string {
    return this.htmlSearch.firstAttrValue(name);
  }

  firstValue(): string {
    return this.htmlSearch.firstValue();
  }

  last(): IHTMLElement | undefined {
    return this.htmlSearch.last();
  }

  lastValue(): string {
    return this.htmlSearch.lastValue();
  }

  tagName(tagName: string): IHTMLSearch {
    return this.htmlSearch.tagName(tagName);
  }

  get value(): string {
    return (
      (this.origin?.childNodes?.[0] as any)?.data ??
      (this.origin as any)?.data ??
      ""
    );
  }

  private get htmlSearch(): IHTMLSearch {
    if (!this._htmlSearch) {
      this._htmlSearch = new HTMLSearch(this.origin);
    }
    return this._htmlSearch;
  }
}
