import { ApplicationType } from "../types/ApplicationType";
import { IEntity } from "../types/IEntity";
import { IRouteMeta } from "../types/IRouteMeta";
import { INote } from "./INote";
import { IOpportunity } from "./IOpportunity";

export interface IUserOpportunity extends IEntity {
  applicationType?: ApplicationType;
  applied: boolean;
  appliedAt?: Date;
  completed: boolean;
  completedAt?: Date;
  contact?: string;
  note?: INote;
  noteId?: string;
  opportunity: IOpportunity;
  rejected: boolean;
  rejectedAt?: Date;
  userId: string;
}

export const UserOpportunitiesRouteMeta: IRouteMeta = {
  path: "/user-opportunities",
};
