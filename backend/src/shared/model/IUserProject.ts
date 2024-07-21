import { ApplicationType } from "../types/ApplicationType";
import { IEntity } from "../types/IEntity";

export interface IUserProject extends IEntity {
  completed: boolean;
  completedAt?: Date;
  applicationType?: ApplicationType;
  applied: boolean;
  appliedAt?: Date;
  contact?: string;
  rejected: boolean;
  rejectedAt?: Date;
}
