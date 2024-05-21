import { IProject } from "../../shared/model/IProject";
import { Provider } from "../../shared/types/Provider";

/**
 * Represents a Provider to request projects from (e.g. FreelancerMap)
 */
export interface IProvider {
  readonly provider: Provider;
  request(url: string): Promise<IProject[]>;
}
