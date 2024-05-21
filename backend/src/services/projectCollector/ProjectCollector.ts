import { IProject } from "../../shared/model/IProject";
import { IProviderRequests } from "../../shared/model/IProviderRequests";
import { IProjectCollector } from "./IProjectCollector";

export class ProjectCollector implements IProjectCollector {
  collect(providerRequests: IProviderRequests[]): IProject[] {
    throw new Error("Method not implemented.");
  }
}
