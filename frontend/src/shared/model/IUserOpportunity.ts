import { ApplicationType } from "../types/ApplicationType";
import { IEntity } from "../types/IEntity";
import { IRouteMeta } from "../types/IRouteMeta";
import { IOpportunity } from "./IOpportunity";

export interface IUserOpportunity extends IEntity {
  completed: boolean;
  completedAt?: Date;
  applicationType?: ApplicationType;
  applied: boolean;
  appliedAt?: Date;
  contact?: string;
  opportunity: IOpportunity;
  rejected: boolean;
  rejectedAt?: Date;
  username: string;
}

export const UserOpportunitiesRouteMeta: IRouteMeta = { path: "/user-opportunities" };
