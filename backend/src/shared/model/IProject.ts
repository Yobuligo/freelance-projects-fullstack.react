import { IEntity } from "../types/IEntity";
import { IHavePath } from "../types/IHavePath";
import { ProviderType } from "../types/ProviderType";

export interface IProject extends IEntity {
  company: string;
  location: string;
  provider: ProviderType;
  publishedAt: Date;
  title: string;
  url: string;
}

export const ProjectMeta: IHavePath = { path: "/projects" };
