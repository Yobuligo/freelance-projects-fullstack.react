import { ProviderFactory } from "../../providers/core/ProviderFactory";
import { IProject } from "../../shared/model/IProject";
import { IProviderRequests } from "../../shared/model/IProviderRequests";
import { IProjectCollector } from "./IProjectCollector";

export class ProjectCollector implements IProjectCollector {
  collect(providerRequests: IProviderRequests[]): Promise<IProject[]> {
    return new Promise(async (resolve, reject) => {
      const projects: IProject[] = [];

      for (let i = 0; i < providerRequests.length; i++) {
        const providerRequest = providerRequests[i];
        const provider = ProviderFactory.createByType(
          providerRequest.providerType
        );

        for (let k = 0; k < providerRequest.urls.length; k++) {
          const url = providerRequest.urls[k];
          const providerProjects = await provider.request(url);
          projects.push(...providerProjects);
        }
      }

      resolve(projects);
    });
  }
}
