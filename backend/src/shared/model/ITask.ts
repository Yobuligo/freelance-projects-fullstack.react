import { IHavePath } from "../types/IHavePath";
import { IEntity } from "../types/IEntity";

export interface ITask extends IEntity {
  startedAt: Date;
  stoppedAt?: Date;
  title: string;
}

export const TaskMeta: IHavePath = { path: "/tasks" };
