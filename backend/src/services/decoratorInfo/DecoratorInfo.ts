import { ClassType } from "../../shared/types/ClassType";
import { Decorator } from "../../shared/types/Decorator";
import { IDecoratorInfo } from "./IDecoratorInfo";

class DecoratorInfoDefault implements IDecoratorInfo {
  private cache: Map<ClassType<any>, Map<Decorator, any>> = new Map();

  find<T>(classType: ClassType<any>, decorator: Decorator): T | undefined {
    const row = this.cache.get(classType);
    return row?.get(decorator);
  }

  introduce<T>(
    classType: ClassType<any>,
    decorator: Decorator,
    value: T
  ): void {
    const row = this.cache.get(classType) ?? new Map<Decorator, any>();
    row.set(decorator, value);
    this.cache.set(classType, row);
  }
}

export const DecoratorInfo = new DecoratorInfoDefault();
