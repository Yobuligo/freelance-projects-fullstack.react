import { IOpportunity } from "../shared/model/IOpportunity";
import { ProviderType } from "../shared/types/ProviderType";

export interface IOpportunityRequest {
  createdAt: Date;
  opportunities: IOpportunity[];
  provider: ProviderType;
  url: string;
}
