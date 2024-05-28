import { IHavePath } from "../types/IHavePath";
import { ProviderType } from "../types/ProviderType";

export interface IProject {
  createdAt: Date;
  company: string;
  id: string;
  location: string;
  provider: ProviderType;
  title: string;
  url: string;
}

export const ProjectMeta: IHavePath = { path: "/projects" };
