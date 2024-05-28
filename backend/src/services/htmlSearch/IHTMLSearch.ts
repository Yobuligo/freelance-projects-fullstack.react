import { IHTMLElement } from "../HTML/IHTMLElement";

export interface IHTMLSearch {
  /**
   * Restrict search result by specific {@link name}-{@link value} attribute pair.
   */
  attribute(name: string, value: any): IHTMLSearch;

  /**
   * Restrict search result by specific {@link className}.
   */
  className(className: string): IHTMLSearch;

  /**
   * Restrict search result by specific index of finding. E.g. only return the third result.
   */
  index(index: number): IHTMLSearch;

  /**
   * Returns all elements, which matches the restrictions.
   */
  find(): IHTMLElement[];

  /**
   * Returns the first element, which matches the restrictions.
   */
  findFirst(): IHTMLElement | undefined;

  /**
   * Returns attribute value with {@link name} of the first element, which matches the restrictions.
   */
  findFirstAttrValue(name: string): string;

  /**
   * Returns the value of the first element, which matches the restrictions.
   */
  findFirstValue(): string;

  /**
   * Restrict search result by specific {@link tagName}.
   */
  tagName(tagName: string): IHTMLSearch;
}
