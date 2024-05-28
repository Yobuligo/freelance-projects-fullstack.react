import { DOMParser } from "xmldom";
import { IHTMLInfo } from "./IHTMLInfo";

export class HTMLInfo implements IHTMLInfo {
  private _document: Document | undefined;

  constructor(private html: string) {}

  findElementByClassName(
    className: string,
    index: number | undefined = 0
  ): Element {
    return this.document.getElementsByClassName(className)[index];
  }

  findValueByClassName(className: string, index?: number | undefined): string;
  findValueByClassName(
    element: Element,
    className: string,
    index?: number | undefined
  ): string;
  findValueByClassName(
    first: unknown,
    second?: unknown,
    third?: unknown
  ): string {
    if (typeof first === "string" && typeof second === "number") {
      return (
        (
          this.document.getElementsByClassName(first)[second]
            ?.childNodes[0] as any
        )?.data ?? ""
      );
    } else {
      const element = first as Element;
      const className = second as string;
      const index = third as number;
      const result = this.findByClassName(element, className);
      if (result) {
        return (result.childNodes?.[0] as any)?.data;
      } else {
        return "";
      }
    }
  }

  // findValueByClassName(
  //   className: string,
  //   index: number | undefined = 0
  // ): string {
  //   return (
  //     (
  //       this.document.getElementsByClassName(className)[index]
  //         ?.childNodes[0] as any
  //     )?.data ?? ""
  //   );
  // }

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

  private findByClassName(
    parent: Element,
    className: string
  ): Element | undefined {
    if (parent.childNodes) {
      for (let i = 0; i < parent.childNodes.length; i++) {
        const childNode = parent.childNodes[i] as Element;
        if (
          childNode.attributes !== undefined &&
          childNode.attributes !== null
        ) {
          for (let k = 0; k < childNode.attributes.length; k++) {
            const attribute = childNode.attributes[k];
            if (
              attribute.name === "class" &&
              attribute.nodeValue === className
            ) {
              return childNode;
            }
          }
        }

        const result = this.findByClassName(childNode, className);
        if (result) {
          return result;
        }
      }
    }

    return undefined;
  }
}
