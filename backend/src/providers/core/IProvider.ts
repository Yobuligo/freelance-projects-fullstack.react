import { IOpportunity } from "../../shared/model/IOpportunity";

/**
 * Represents a Provider to request projects from (e.g. FreelancerMap)
 */
export interface IProvider {
  request(url: string): Promise<IOpportunity[]>;
}
