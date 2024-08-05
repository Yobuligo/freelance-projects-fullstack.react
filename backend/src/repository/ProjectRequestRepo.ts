import { IProjectRequest } from "../model/IProjectRequest";
import { IOpportunity } from "../shared/model/IOpportunity";
import { ProviderType } from "../shared/types/ProviderType";

class ProjectRequestRepoDefault {
  private readonly projectRequests: Map<string, IProjectRequest> = new Map();

  find(url: string): IProjectRequest | undefined {
    return this.projectRequests.get(url);
  }

  set(provider: ProviderType, url: string, projects: IOpportunity[]) {
    this.projectRequests.set(url, {
      createdAt: new Date(),
      projects,
      provider,
      url,
    });
  }
}

export const ProjectRequestRepo = new ProjectRequestRepoDefault();
