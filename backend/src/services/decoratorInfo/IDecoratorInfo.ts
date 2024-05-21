import { Constructor } from "../../shared/types/Constructor";
import { Decorator } from "../../shared/types/Decorator";

export interface IDecoratorInfo {
  find<T>(type: Constructor<any>, decorator: Decorator): T | undefined;
  introduce<T>(type: Constructor<any>, decorator: Decorator, value: T): void;
}
