import { IProject } from "../../shared/model/IProject";
import { IProviderRequests } from "../../shared/model/IProviderRequests";
import { ProviderInfo } from "../../providers/core/ProviderInfo";
import { IProjectCollector } from "./IProjectCollector";

export class ProjectCollector implements IProjectCollector {
  collect(providerRequests: IProviderRequests[]): Promise<IProject[]> {
    return new Promise(async (resolve, reject) => {
      const projects: IProject[] = [];
      providerRequests.forEach((providerRequest) => {
        const provider = ProviderInfo.findByType(
          providerRequest.provider
        );

        providerRequest.urls.forEach((url) => {
          provider?.request(url);
        });
      });
    });
  }
}
