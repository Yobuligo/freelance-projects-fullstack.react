import { IHavePath } from "../types/IHavePath";
import { ProviderType } from "../types/ProviderType";
import { IProjectDetails } from "./IProjectDetails";

export interface IProject extends IProjectDetails {
  createdAt: Date;
  company: string;
  id: string;
  location: string;
  provider: ProviderType;
  title: string;
  url: string;
}

export const ProjectMeta: IHavePath = { path: "/projects" };
