import { HTMLSearch } from "../htmlSearch/HTMLSearch";
import { IHTMLSearch } from "../htmlSearch/IHTMLSearch";
import { IHTMLElement } from "./IHTMLElement";

export class HTMLElement implements IHTMLElement {
  private _htmlSearch: IHTMLSearch | undefined;

  constructor(readonly origin: Element, readonly value: string) {}

  attribute(name: string, value: any): IHTMLSearch {
    this.htmlSearch.attribute(name, value);
    return this.htmlSearch;
  }

  className(className: string): IHTMLSearch {
    this.htmlSearch.className(className);
    return this.htmlSearch;
  }

  index(index: number): IHTMLSearch {
    this.htmlSearch.index(index);
    return this.htmlSearch;
  }

  find(): IHTMLElement[] {
    return this.htmlSearch.find();
  }

  findFirst(): IHTMLElement | undefined {
    return this.htmlSearch.findFirst();
  }

  findFirstAttrValue(name: string): string {
    return this.htmlSearch.findFirstAttrValue(name);
  }

  findFirstValue(): string {
    return this.htmlSearch.findFirstValue();
  }

  tagName(tagName: string): IHTMLSearch {
    return this.htmlSearch.tagName(tagName);
  }

  private get htmlSearch(): IHTMLSearch {
    if (!this._htmlSearch) {
      this._htmlSearch = new HTMLSearch(this.origin);
    }
    return this._htmlSearch;
  }
}
