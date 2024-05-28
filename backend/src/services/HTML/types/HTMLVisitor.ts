/**
 * HTMLVisitor that is called for each element.
 * Return true to continue visiting otherwise false.
 */
export type HTMLVisitor = (element: Element) => boolean | void;
