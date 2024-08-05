import { AppConfig } from "../../AppConfig";
import { IProvider } from "../../providers/core/IProvider";
import { ProviderFactory } from "../../providers/core/ProviderFactory";
import { ProjectRequestRepo } from "../../repository/ProjectRequestRepo";
import { IOpportunity } from "../../shared/model/IOpportunity";
import { IProviderRequests } from "../../shared/model/IProviderRequests";
import { ProviderType } from "../../shared/types/ProviderType";
import { createError } from "../../shared/utils/createError";
import { wait } from "../../utils/wait";
import { IProjectCollector } from "./IProjectCollector";

export class ProjectCollector implements IProjectCollector {
  collect(providerRequests: IProviderRequests[]): Promise<IOpportunity[]> {
    return new Promise(async (resolve, reject) => {
      const projects: IOpportunity[] = [];

      try {
        // parallelize fetching data for each provider
        const requests = providerRequests.map((providerRequest) =>
          this.requestProjects(providerRequest)
        );
        const requestedProjects = await Promise.all(requests);
        requestedProjects.forEach((items) => projects.push(...items));
      } catch (error) {
        reject(error);
      }

      const harmonizedProjects = this.removeDuplicates(projects);
      resolve(harmonizedProjects);
    });
  }

  private removeDuplicates(projects: IOpportunity[]): IOpportunity[] {
    const harmonizedProjects: IOpportunity[] = [];
    projects.forEach((project) => {
      const index = harmonizedProjects.findIndex(
        (item) => item.id === project.id
      );
      if (index === -1) {
        harmonizedProjects.push(project);
      }
    });
    return harmonizedProjects;
  }

  private async requestProjects(
    providerRequest: IProviderRequests
  ): Promise<IOpportunity[]> {
    return new Promise(async (resolve, reject) => {
      const projects: IOpportunity[] = [];
      const provider = this.createProvider(providerRequest);

      for (let i = 0; i < providerRequest.urls.length; i++) {
        const url = providerRequest.urls[i];
        if (!this.needsReload(url) && providerRequest.force !== true) {
          projects.push(...(ProjectRequestRepo.find(url)?.projects ?? []));
          continue;
        }

        if (i > 0) {
          await wait(1000);
        }

        try {
          const providerProjects = await provider.request(url);
          projects.push(...providerProjects);
          this.cacheProjects(
            providerRequest.providerType,
            url,
            providerProjects
          );
        } catch (error) {
          reject(
            createError(
              `Error while loading projects of provider ${providerRequest.providerType}.`
            )
          );
        }
      }

      resolve(projects);
    });
  }

  private cacheProjects(
    provider: ProviderType,
    url: string,
    projects: IOpportunity[]
  ) {
    ProjectRequestRepo.set(provider, url, projects);
  }

  private createProvider(providerRequest: IProviderRequests): IProvider {
    return ProviderFactory.createByType(providerRequest.providerType);
  }

  private needsReload(url: string): boolean {
    const projectRequest = ProjectRequestRepo.find(url);
    if (!projectRequest) {
      return true;
    }

    const createdAt = new Date(projectRequest.createdAt);
    createdAt.setTime(
      createdAt.getTime() + AppConfig.reloadIntervalMins * 60000
    );

    const now = new Date();
    return now.getTime() > createdAt.getTime();
  }
}
