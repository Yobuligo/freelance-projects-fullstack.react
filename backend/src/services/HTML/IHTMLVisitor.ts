export interface IHTMLVisitor {
  /**
   * Visitor will be visited by {@link element}.
   * Return true to continue with next node or false to stop iteration.
   */
  visit(element: Element): boolean;
}
