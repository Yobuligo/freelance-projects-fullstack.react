import { ApplicationType } from "../types/ApplicationType";

export interface IProjectDetails {
  applicationType?: ApplicationType;
  applied: boolean;
  completed: boolean;
  completedAt?: Date;
}
