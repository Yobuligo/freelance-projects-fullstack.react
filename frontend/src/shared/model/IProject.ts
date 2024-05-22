import { IHavePath } from "../types/IHavePath";

export interface IProject {
  createdAt: Date;
  company: string;
  location: string;
  title: string;
  url: string;
}

export const ProjectMeta: IHavePath = { path: "/projects" };
