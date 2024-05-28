import { HTMLVisitor } from "./types/HTMLVisitor";

export class HTMLTree {
  constructor(private readonly visitor: HTMLVisitor) {}

  /**
   * Visits {@link element}.
   * Return true to continue visiting otherwise false.
   */
  visit(element: Element): boolean | undefined {
    const resume = this.visitor(element);
    if (resume === false) {
      return false;
    }

    return this.visitInternal(element);
  }

  private visitInternal(element: Element): boolean | undefined {
    if (!element.childNodes) {
      return true;
    }

    for (let i = 0; i < element.childNodes.length; i++) {
      const childElement = element.childNodes[i] as Element;
      let resume = this.visitor(childElement);
      if (resume === false) {
        return false;
      }

      resume = this.visitInternal(childElement);
      if (resume === false) {
        return false;
      }
    }

    return true;
  }
}
