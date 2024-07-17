import { ApplicationType } from "../types/ApplicationType";
import { IEntity } from "../types/IEntity";

export interface IUserProject extends IEntity {
  userId: string;
  projectId: string;
  completed: boolean;
  completedAt?: Date;
  applicationType?: ApplicationType;
  applied: boolean;
  appliedAt?: Date;
  contact?: string;
  rejected: boolean;
  rejectedAt?: Date;
}
