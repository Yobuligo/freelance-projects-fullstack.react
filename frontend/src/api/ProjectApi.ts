import { IProject, ProjectMeta } from "../shared/model/IProject";
import { ProviderType } from "../shared/types/ProviderType";
import { IProviderRequests } from "./../shared/model/IProviderRequests";
import { RESTApi } from "./RESTApi";

class ProjectApiDefault extends RESTApi {
  findAll(): Promise<IProject[]> {
    const providerRequests: IProviderRequests[] = [
      {
        providerType: ProviderType.FreelancerMap,
        urls: [
          "https://www.freelancermap.de/projektboerse.html?categories%5B0%5D=1&created=3&projectContractTypes%5B0%5D=contracting&remoteInPercent%5B0%5D=100&remoteInPercent%5B1%5D=1&query=typescript&countries%5B%5D=1&sort=1&pagenr=1",
        ],
      },
    ];

    return this.post(
      `http://localhost:5000/api${ProjectMeta.path}`,
      providerRequests
    );
  }
}

export const ProjectApi = new ProjectApiDefault();
