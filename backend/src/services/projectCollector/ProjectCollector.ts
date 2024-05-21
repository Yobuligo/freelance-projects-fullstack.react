import { IProject } from "../../shared/model/IProject";
import { IProviderRequests } from "../../shared/model/IProviderRequests";
import { ProviderInfo } from "../provider/ProviderInfo";
import { IProjectCollector } from "./IProjectCollector";

export class ProjectCollector implements IProjectCollector {
  collect(providerRequests: IProviderRequests[]): Promise<IProject[]> {
    return new Promise(async (resolve, reject) => {
      const projects: IProject[] = [];
      providerRequests.forEach((providerRequest) => {
        const projectRequestor = ProviderInfo.findByType(
          providerRequest.provider
        );

        providerRequest.urls.forEach((url) => {
          projectRequestor?.request(url);
        });
      });
    });
  }
}
