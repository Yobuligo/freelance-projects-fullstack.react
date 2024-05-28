import { IHTMLVisitor } from "./IHTMLVisitor";
import { HTMLSearchPredicate } from "./types/HTMLSearchPredicate";

export class HTMLVisitor implements IHTMLVisitor {
  private _element: Element | undefined = undefined;

  constructor(private readonly predicate: HTMLSearchPredicate) {}

  get element(): Element | undefined {
    return this._element;
  }

  visit(element: Element): boolean {
    const needsContinue = this.predicate(element);
    if (!needsContinue) {
      this._element = element;
    }
    return needsContinue;
  }
}
