import { IOpportunityRequest } from "../model/IOpportunityRequest";
import { IOpportunity } from "../shared/model/IOpportunity";
import { ProviderType } from "../shared/types/ProviderType";

class OpportunityRequestRepoDefault {
  private readonly opportunitiesRequests: Map<string, IOpportunityRequest> =
    new Map();

  find(url: string): IOpportunityRequest | undefined {
    return this.opportunitiesRequests.get(url);
  }

  set(provider: ProviderType, url: string, opportunities: IOpportunity[]) {
    this.opportunitiesRequests.set(url, {
      createdAt: new Date(),
      opportunities,
      provider,
      url,
    });
  }
}

export const OpportunityRequestRepo = new OpportunityRequestRepoDefault();
