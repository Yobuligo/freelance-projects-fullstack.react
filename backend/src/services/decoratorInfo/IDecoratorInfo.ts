import { ClassType } from "../../shared/types/ClassType";
import { Decorator } from "../../shared/types/Decorator";

export interface IDecoratorInfo {
  find<T>(classType: ClassType<any>, decorator: Decorator): T | undefined;
  introduce<T>(classType: ClassType<any>, decorator: Decorator, value: T): void;
}
