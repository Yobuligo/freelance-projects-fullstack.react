import { IHTMLElement } from "../HTML/IHTMLElement";

export interface IHTMLSearch {
  attribute(name: string, value: any): IHTMLSearch;
  className(className: string): IHTMLSearch;
  index(index: number): IHTMLSearch;
  find(): IHTMLElement[];
  findFirst(): IHTMLElement | undefined;
  findFirstAttrValue(name: string): string | undefined;
  findFirstValue(): string | undefined;
}
