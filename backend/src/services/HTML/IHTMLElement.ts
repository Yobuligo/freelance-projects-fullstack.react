import { IHTMLSearch } from "../htmlSearch/IHTMLSearch";

export interface IHTMLElement extends IHTMLSearch {
  readonly origin: Element;
  readonly value: string;
}
