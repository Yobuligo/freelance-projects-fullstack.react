import { IProject } from "../shared/model/IProject";
import { ProviderType } from "../shared/types/ProviderType";

export interface IProjectRequest {
  createdAt: Date;
  projects: IProject[];
  provider: ProviderType;
  url: string;
}
