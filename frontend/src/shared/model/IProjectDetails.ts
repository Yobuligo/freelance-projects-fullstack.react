import { ApplicationType } from "../types/ApplicationType";

export interface IProjectDetails {
  applicationType?: ApplicationType;
  applied: boolean;
  appliedAt?: Date;
  completed: boolean;
  completedAt?: Date;
  contact?: string;
}
