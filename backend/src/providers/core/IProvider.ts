import { IProject } from "../../shared/model/IProject";
import { ProviderType } from "../../shared/types/ProviderType";

/**
 * Represents a Provider to request projects from (e.g. FreelancerMap)
 */
export interface IProvider {
  readonly type: ProviderType;
  request(url: string): Promise<IProject[]>;
}
