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
   * Restrict search result by specific index of finding.
   * E.g. restrict to className "test" and index 3 means to return the third element with className "test"
   */
  indexFinding(index: number): IHTMLSearch;

  /**
   * Returns all elements, which matches the restrictions.
   */
  find(): IHTMLElement[];

  /**
   * Returns the element at {@link index}, which matches the restrictions or null
   */
  findAt(index: number): IHTMLElement | undefined;

  /**
   * Returns the first element, which matches the restrictions or null.
   */
  first(): IHTMLElement | undefined;

  /**
   * Returns attribute value with {@link name} of the first element, which matches the restrictions.
   */
  firstAttrValue(name: string): string;

  /**
   * Returns the value of the first element, which matches the restrictions.
   */
  firstValue(): string;

  /**
   * Returns the last element, which matches the restrictions or null.
   */
  last(): IHTMLElement | undefined;

  /**
   * Returns the value of the last element, which matches the restrictions.
   */
  lastValue(): string;

  /**
   * Restrict search result by specific {@link tagName}.
   */
  applyTagName(tagName: string): IHTMLSearch;
}
