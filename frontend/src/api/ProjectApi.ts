import { IProviderRequest } from "../model/IProviderRequest";
import { IProject, ProjectMeta } from "../shared/model/IProject";
import { IProviderRequests } from "./../shared/model/IProviderRequests";
import { RESTApi } from "./RESTApi";

class ProjectApiDefault extends RESTApi {
  findAll(providerRequests: IProviderRequest[]): Promise<IProject[]> {
    const requests = this.convertToBackendFormat(providerRequests);
    return this.post(`http://localhost:5000/api${ProjectMeta.path}`, requests);
  }

  private convertToBackendFormat(
    providerRequests: IProviderRequest[]
  ): IProviderRequests[] {
    const requests: IProviderRequests[] = [];

    providerRequests.forEach((providerRequest) => {
      const request = requests.find(
        (request) => request.providerType === providerRequest.providerType
      );

      if (request) {
        request.urls.push(providerRequest.providerUrl);
      } else {
        requests.push({
          providerType: providerRequest.providerType,
          urls: [providerRequest.providerUrl],
        });
      }
    });

    return requests;
  }
}

export const ProjectApi = new ProjectApiDefault();
