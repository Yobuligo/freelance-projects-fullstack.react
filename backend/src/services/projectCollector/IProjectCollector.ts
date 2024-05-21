import { IProject } from "../../shared/model/IProject";
import { IProviderRequests } from "../../shared/model/IProviderRequests";

/**
 * A ProjectCollector is responsible for collecting projects from the given providers and the corresponding urls
 */
export interface IProjectCollector {
  collect(providerRequests: IProviderRequests[]): Promise<IProject[]>;
}
