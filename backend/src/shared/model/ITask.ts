import { IRouteMeta } from "../types/IRouteMeta";
import { IEntity } from "../types/IEntity";

export interface ITask extends IEntity {
  startedAt: Date;
  stoppedAt?: Date;
  title: string;
}

export const TaskRouteMeta: IRouteMeta = { path: "/tasks" };
