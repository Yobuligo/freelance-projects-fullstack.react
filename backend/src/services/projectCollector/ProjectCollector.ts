import { AppConfig } from "../../AppConfig";
import { IProvider } from "../../providers/core/IProvider";
import { ProviderFactory } from "../../providers/core/ProviderFactory";
import { ProjectRequestRepo } from "../../repository/ProjectRequestRepo";
import { IProject } from "../../shared/model/IProject";
import { IProviderRequests } from "../../shared/model/IProviderRequests";
import { ProviderType } from "../../shared/types/ProviderType";
import { wait } from "../../utils/wait";
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

      const harmonizedProjects = this.removeDuplicates(projects);
      resolve(harmonizedProjects);
    });
  }

  private removeDuplicates(projects: IProject[]): IProject[] {
    const harmonizedProjects: IProject[] = [];
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
  ): Promise<IProject[]> {
    const projects: IProject[] = [];
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
