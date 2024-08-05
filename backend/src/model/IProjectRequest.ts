import { IOpportunity } from "../shared/model/IOpportunity";
import { ProviderType } from "../shared/types/ProviderType";

export interface IProjectRequest {
  createdAt: Date;
  projects: IOpportunity[];
  provider: ProviderType;
  url: string;
}
