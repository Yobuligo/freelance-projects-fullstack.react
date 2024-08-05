import { ApplicationType } from "../types/ApplicationType";
import { IEntity } from "../types/IEntity";
import { IHavePath } from "../types/IHavePath";
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
  userId: string;
}

export const UserOpportunityMeta: IHavePath = { path: "/user-opportunities" };
