import { IProjectRequest } from "../model/IProjectRequest";
import { IProject } from "../shared/model/IProject";
import { ProviderType } from "../shared/types/ProviderType";

class ProjectRequestRepoDefault {
  private readonly projectRequests: Map<string, IProjectRequest> = new Map();

  find(url: string): IProjectRequest | undefined {
    return this.projectRequests.get(url);
  }

  set(provider: ProviderType, url: string, projects: IProject[]) {
    this.projectRequests.set(url, {
      createdAt: new Date(),
      projects,
      provider,
      url,
    });
  }
}

export const ProjectRequestRepo = new ProjectRequestRepoDefault();
