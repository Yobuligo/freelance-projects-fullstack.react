import { IEntity } from "../types/IEntity";
import { IRouteMeta } from "../types/IRouteMeta";
import { ProviderType } from "../types/ProviderType";

export interface IOpportunity extends IEntity {
  company: string;
  location: string;
  provider: ProviderType;
  publishedAt: Date;
  title: string;
  url: string;
}

export const OpportunityRouteMeta: IRouteMeta = { path: "/opportunities" };
