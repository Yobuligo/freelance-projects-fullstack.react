import { Constructor } from "../../shared/types/Constructor";
import { Decorator } from "../../shared/types/Decorator";
import { IDecoratorInfo } from "./IDecoratorInfo";

class DecoratorInfoDefault implements IDecoratorInfo {
  private cache: Map<Constructor<any>, Map<Decorator, any>> = new Map();

  find<T>(type: Constructor<any>, decorator: Decorator): T | undefined {
    const row = this.cache.get(type);
    return row?.get(decorator);
  }

  introduce<T>(type: Constructor<any>, decorator: Decorator, value: T): void {
    const row = this.cache.get(type) ?? new Map<Decorator, any>();
    row.set(decorator, value);
    this.cache.set(type, row);
  }
}

export const DecoratorInfo = new DecoratorInfoDefault();
