import { IProject } from "../../shared/model/IProject";
import { IProviderRequests } from "../../shared/model/IProviderRequests";

export interface IProjectCollector {
  collect(providerRequests: IProviderRequests[]): IProject[];
}
