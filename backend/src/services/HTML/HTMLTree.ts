import { IHTMLTree } from "./IHTMLTree";
import { IHTMLVisitor } from "./IHTMLVisitor";

export class HTMLTree implements IHTMLTree {
  constructor(private readonly visitor: IHTMLVisitor) {}

  visit(element: Element): boolean {
    this.visitor.visit(element);

    if (!element.childNodes) {
      return true;
    }

    for (let i = 0; i < element.childNodes.length; i++) {
      const childElement = element.childNodes[i] as Element;
      const needsContinue = this.visitor.visit(childElement);
      if (!needsContinue) {
        return false;
      }

      return this.visit(childElement);
    }

    return true;
  }
}
