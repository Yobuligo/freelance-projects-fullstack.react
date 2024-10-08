import { Pair } from "../../shared/utils/Pair";
import { isNull } from "../../shared/utils/isNull";
import { HTMLElement } from "../HTML/HTMLElement";
import { HTMLTree } from "../HTML/HTMLTree";
import { IHTMLElement } from "../HTML/IHTMLElement";
import { HTMLVisitor } from "../HTML/types/HTMLVisitor";
import { IHTMLSearch } from "./IHTMLSearch";

export class HTMLSearch implements IHTMLSearch {
  private attributes: Pair<any, any>[] = [];
  private counter: number = 0;
  private elements: IHTMLElement[] = [];
  private _index: number | undefined = undefined;
  private _tagName: string | undefined = undefined;

  constructor(private readonly root: Element) {}

  attribute(name: string, value: any): IHTMLSearch {
    this.attributes.push(new Pair(name, value));
    return this;
  }

  className(className: string): IHTMLSearch {
    this.attributes.push(new Pair("class", className));
    return this;
  }

  indexFinding(index: number): IHTMLSearch {
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

  findAt(index: number): IHTMLElement | undefined {
    return this.find()[index];
  }

  firstAttrValue(name: string): string {
    return this.first()?.origin.getAttribute(name) ?? "";
  }

  first(): IHTMLElement | undefined {
    return this.findAt(0);
  }

  firstValue(): string {
    return this.first()?.value ?? "";
  }

  last(): IHTMLElement | undefined {
    const elements = this.find();
    return elements[elements.length - 1];
  }

  lastValue(): string {
    return this.last()?.value ?? "";
  }

  applyTagName(tagName: string): IHTMLSearch {
    this._tagName = tagName;
    return this;
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
        this.elements.push(new HTMLElement(element));
      }
    };
  }

  private matches(element: Element): boolean {
    if (!this.fullfilAttributes(element)) {
      return false;
    }

    if (!this.fullfilTagName(element)) {
      return false;
    }

    const fullfilIndex = this.fullfilIndex(this.counter);
    this.counter++;
    return fullfilIndex;
  }

  private fullfilTagName(element: Element): boolean {
    if (!this._tagName) {
      return true;
    }

    if (!element.tagName) {
      return false;
    }

    return element.tagName === this._tagName;
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
