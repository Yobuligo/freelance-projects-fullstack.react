import { IOpportunity } from "../../shared/model/IOpportunity";
import { IProviderRequests } from "../../shared/model/IProviderRequests";

/**
 * A OpportunityCollector is responsible for collecting opportunities (published announcements) from the given providers and the corresponding urls
 */
export interface IOpportunityCollector {
  collect(providerRequests: IProviderRequests[]): Promise<IOpportunity[]>;
}
