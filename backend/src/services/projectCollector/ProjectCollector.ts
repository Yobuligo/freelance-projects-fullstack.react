import { AppConfig } from "../../AppConfig";
import { IProvider } from "../../shared/types/IProvider";
import { ProviderFactory } from "../../providers/core/ProviderFactory";
import { ProjectRequestRepo } from "../../repository/ProjectRequestRepo";
import { IProject } from "../../shared/model/IProject";
import { IProviderRequests } from "../../shared/model/IProviderRequests";
import { ProviderType } from "../../shared/types/ProviderType";
import { IProjectCollector } from "./IProjectCollector";

export class ProjectCollector implements IProjectCollector {
  collect(providerRequests: IProviderRequests[]): Promise<IProject[]> {
    return new Promise(async (resolve, reject) => {
      const projects: IProject[] = [];

      for (let i = 0; i < providerRequests.length; i++) {
        const providerRequest = providerRequests[i];
        const providerProjects = await this.requestProjects(providerRequest);
        projects.push(...providerProjects);
      }

      resolve(projects);
    });
  }

  private async requestProjects(
    providerRequest: IProviderRequests
  ): Promise<IProject[]> {
    const projects: IProject[] = [];
    const provider = this.createProvider(providerRequest);

    for (let k = 0; k < providerRequest.urls.length; k++) {
      const url = providerRequest.urls[k];
      if (!this.needsReload(url) && providerRequest.force !== true) {
        projects.push(...(ProjectRequestRepo.find(url)?.projects ?? []));
        continue;
      }

      const providerProjects = await provider.request(url);
      projects.push(...providerProjects);
      this.cacheProjects(providerRequest.providerType, url, providerProjects);
    }

    return projects;
  }

  private cacheProjects(
    provider: ProviderType,
    url: string,
    projects: IProject[]
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
