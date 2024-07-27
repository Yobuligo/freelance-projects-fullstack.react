import { ApplicationType } from "../types/ApplicationType";
import { IEntity } from "../types/IEntity";
import { IProject } from "./IProject";

export interface IUserProject extends IEntity {
  completed: boolean;
  completedAt?: Date;
  applicationType?: ApplicationType;
  applied: boolean;
  appliedAt?: Date;
  contact?: string;
  project: IProject;
  rejected: boolean;
  rejectedAt?: Date;
  userId: string;
}
