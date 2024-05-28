import { HTMLTree } from "./HTMLTree";
import { HTMLVisitor } from "./HTMLVisitor";
import { HTMLSearchPredicate } from "./types/HTMLSearchPredicate";

export class HTMLSearch {
  constructor(private readonly root: Element) {}

  find(predicate: HTMLSearchPredicate): Element | undefined {
    const htmlVisitor = new HTMLVisitor(predicate);
    const htmlTree = new HTMLTree(htmlVisitor);
    htmlTree.visit(this.root);
    return htmlVisitor.element;
  }
}
