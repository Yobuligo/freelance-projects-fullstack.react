export interface IHTMLInfo {
  findElementByClassName(className: string, index?: number): Element;
  findValueByClassName(className: string, index?: number): string;
  findValueByClassName(
    element: Element,
    className: string,
    index?: number
  ): string;
  findValueByClassNameAndProp(
    className: string,
    propName: string,
    index?: number
  ): string;
  getNumberElementsByClassName(className: string): number;
}
