import { Pair } from "../../shared/utils/Pair";
import { isNull } from "../../shared/utils/isNull";
import { HTMLTree } from "../HTML/HTMLTree";
import { IHTMLElement } from "../HTML/IHTMLElement";
import { HTMLVisitor } from "../HTML/types/HTMLVisitor";
import { IHTMLSearch } from "./IHTMLSearch";

export class HTMLSearch implements IHTMLSearch {
  private attributes: Pair<any, any>[] = [];
  private counter: number = 0;
  private elements: IHTMLElement[] = [];
  private _index: number | undefined = undefined;

  constructor(private readonly root: Element) {}

  attribute(name: string, value: any): IHTMLSearch {
    this.attributes.push(new Pair(name, value));
    return this;
  }

  className(className: string): IHTMLSearch {
    this.attributes.push(new Pair("class", className));
    return this;
  }

  index(index: number): IHTMLSearch {
    this._index = index;
    return this;
  }

  find(): IHTMLElement[] {
    const htmlTree = new HTMLTree(this.createVisitor());
    htmlTree.visit(this.root);
    const elements = this.elements;
    this.reset();
    return elements;
  }

  findFirstAttrValue(name: string): string | undefined {
    return this.findFirst()?.origin.getAttribute(name) ?? undefined;
  }

  findFirst(): IHTMLElement | undefined {
    return this.find()[0];
  }

  findFirstValue(): string | undefined {
    return this.findFirst()?.value;
  }

  private reset() {
    this.attributes = [];
    this.counter = 0;
    this.elements = [];
    this._index = undefined;
  }

  private createVisitor(): HTMLVisitor {
    return (element) => {
      if (this.matches(element)) {
        this.elements.push({
          origin: element,
          value: (element.childNodes[0] as any)?.data,
        });
      }
    };
  }

  private matches(element: Element): boolean {
    if (!this.fullfilAttributes(element)) {
      return false;
    }

    const fullfilIndex = this.fullfilIndex(this.counter);
    this.counter++;
    return fullfilIndex;
  }

  private fullfilAttributes(element: Element): boolean {
    if (this.attributes.length === 0) {
      return true;
    }

    if (!this.hasAttributes(element)) {
      return false;
    }

    for (let i = 0; i < this.attributes.length; i++) {
      const attribute = this.findAttribute(element, this.attributes[i]);
      if (!attribute) {
        return false;
      }
    }

    return true;
  }

  private fullfilIndex(index: number) {
    if (this._index === undefined) {
      return true;
    }

    return this._index === index;
  }

  private hasAttributes(element: Element): boolean {
    return !isNull(element.attributes);
  }

  private findAttribute(
    element: Element,
    pair: Pair<any, any>
  ): Attr | undefined {
    if (!this.hasAttributes(element)) {
      return undefined;
    }

    for (let i = 0; i < element.attributes.length; i++) {
      const attribute = element.attributes[i];
      if (attribute.name === pair.name && attribute.nodeValue === pair.value) {
        return attribute;
      }
    }

    return undefined;
  }
}
