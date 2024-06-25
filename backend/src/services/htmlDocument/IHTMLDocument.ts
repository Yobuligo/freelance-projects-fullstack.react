/**
 * An implementation of this interface provides an easier access to the HTML-Document and to find rootElements to start searching.
 * So the HTML Search starts searching within the first, root element
 */
export interface IHTMLDocument {
  readonly document: Document;
  findByClassName(className: string): HTMLCollectionOf<Element>;
}
