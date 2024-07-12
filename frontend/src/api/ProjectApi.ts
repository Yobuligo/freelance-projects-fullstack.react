import { IProviderRequest } from "../model/IProviderRequest";
import { IProject, ProjectMeta } from "../shared/model/IProject";
import { IProviderRequests } from "./../shared/model/IProviderRequests";
import { RESTApi } from "./RESTApi";

/**
 * This class is responsible to control the access to the data layer for projects.
 */
class ProjectApiDefault extends RESTApi {
  findAll(
    providerRequests: IProviderRequest[],
    force?: boolean
  ): Promise<IProject[]> {
    const requests = this.convertToBackendFormat(providerRequests, force);
    return this.post(`${this.host}${ProjectMeta.path}`, requests);
  }

  /**
   * Converts the provider requests to the format which is expected from the backend.
   */
  private convertToBackendFormat(
    providerRequests: IProviderRequest[],
    force?: boolean
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
          force: force,
          providerType: providerRequest.providerType,
          urls: [providerRequest.providerUrl],
        });
      }
    });

    return requests;
  }
}

export const ProjectApi = new ProjectApiDefault();
