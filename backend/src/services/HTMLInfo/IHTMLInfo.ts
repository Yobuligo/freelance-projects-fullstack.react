export interface IHTMLInfo {
  findValueByClassName(className: string, index?: number): string;
  findValueByClassNameAndProp(
    className: string,
    propName: string,
    index?: number
  ): string;
  getNumberElementsByClassName(className: string): number;
}
