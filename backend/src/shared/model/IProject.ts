import { IRouteMeta } from "../types/IRouteMeta";
import { IEntity } from "../types/IEntity";
import { ITask } from "./ITask";

export interface IProject extends IEntity {
  tasks: ITask[];
  title: string;
  userId: string;
}

export const ProjectRouteMeta: IRouteMeta = { path: "/projects" };
