import { IHavePath } from "../types/IHavePath";
import { IEntity } from "../types/IEntity";
import { ITask } from "./ITask";

export interface IProject extends IEntity {
  tasks: ITask[];
  title: string;
}

export const ProjectMeta: IHavePath = { path: "/projects" };
