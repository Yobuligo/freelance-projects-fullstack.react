import { AppConfig } from "../../AppConfig";
import { IProvider } from "../../providers/core/IProvider";
import { ProviderFactory } from "../../providers/core/ProviderFactory";
import { OpportunityRequestRepo } from "../../repository/OpportunityRequestRepo";
import { IOpportunity } from "../../shared/model/IOpportunity";
import { IProviderRequests } from "../../shared/model/IProviderRequests";
import { ProviderType } from "../../shared/types/ProviderType";
import { createError } from "../../shared/utils/createError";
import { wait } from "../../utils/wait";
import { IOpportunityCollector } from "./IOpportunityCollector";

export class OpportunityCollector implements IOpportunityCollector {
  collect(providerRequests: IProviderRequests[]): Promise<IOpportunity[]> {
    return new Promise(async (resolve, reject) => {
      const opportunities: IOpportunity[] = [];

      try {
        // parallelize fetching data for each provider
        const requests = providerRequests.map((providerRequest) =>
          this.requestOpportunities(providerRequest)
        );
        const requestedOpportunities = await Promise.all(requests);
        requestedOpportunities.forEach((items) => opportunities.push(...items));
      } catch (error) {
        reject(error);
      }

      const harmonizedOpportunities = this.removeDuplicates(opportunities);
      resolve(harmonizedOpportunities);
    });
  }

  /**
   * Remove duplicates from list.
   * Perhaps the same opportunity was found by searching with "React" and "TypeScript". So remove it by comparing the urls.
   */
  private removeDuplicates(opportunities: IOpportunity[]): IOpportunity[] {
    const harmonizedOpportunities: IOpportunity[] = [];
    opportunities.forEach((opportunity) => {
      const index = harmonizedOpportunities.findIndex(
        (item) => item.url === opportunity.url
      );
      if (index === -1) {
        harmonizedOpportunities.push(opportunity);
      }
    });
    return harmonizedOpportunities;
  }

  private async requestOpportunities(
    providerRequest: IProviderRequests
  ): Promise<IOpportunity[]> {
    return new Promise(async (resolve, reject) => {
      const opportunities: IOpportunity[] = [];
      const provider = this.createProvider(providerRequest);

      for (let i = 0; i < providerRequest.urls.length; i++) {
        const url = providerRequest.urls[i];
        if (!this.needsReload(url) && providerRequest.force !== true) {
          opportunities.push(
            ...(OpportunityRequestRepo.find(url)?.opportunities ?? [])
          );
          continue;
        }

        if (i > 0) {
          await wait(1000);
        }

        try {
          const providerOpportunities = await provider.request(url);
          opportunities.push(...providerOpportunities);
          this.cacheOpportunities(
            providerRequest.providerType,
            url,
            providerOpportunities
          );
        } catch (error) {
          reject(
            createError(
              `Error while loading opportunities of provider ${providerRequest.providerType}.`
            )
          );
        }
      }

      resolve(opportunities);
    });
  }

  private cacheOpportunities(
    provider: ProviderType,
    url: string,
    opportunities: IOpportunity[]
  ) {
    OpportunityRequestRepo.set(provider, url, opportunities);
  }

  private createProvider(providerRequest: IProviderRequests): IProvider {
    return ProviderFactory.createByType(providerRequest.providerType);
  }

  private needsReload(url: string): boolean {
    const opportunityRequest = OpportunityRequestRepo.find(url);
    if (!opportunityRequest) {
      return true;
    }

    const createdAt = new Date(opportunityRequest.createdAt);
    createdAt.setTime(
      createdAt.getTime() + AppConfig.reloadIntervalMins * 60000
    );

    const now = new Date();
    // return now.getTime() > createdAt.getTime();
    return true;
  }
}
