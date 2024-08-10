import { IRouteMeta } from "../types/IRouteMeta";
import { IEntity } from "../types/IEntity";

export interface ITask extends IEntity {
  startedAt: Date;
  stoppedAt?: Date;
  projectId: string;
  title: string;
}

export const TaskRouteMeta: IRouteMeta = { path: "/tasks" };
