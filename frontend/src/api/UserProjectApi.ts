import { IProviderRequest } from "../model/IProviderRequest";
import { IProviderRequests } from "../shared/model/IProviderRequests";
import { IUserProject, UserProjectMeta } from "../shared/model/IUserProject";
import { RESTApi } from "./core/RESTApi";

export class UserProjectApi extends RESTApi {
  findAll(
    providerRequests: IProviderRequest[],
    force?: boolean
  ): Promise<IUserProject[]> {
    const requests = this.convertToBackendFormat(providerRequests, force);
    return this.post(`${this.host}${UserProjectMeta.path}`, requests);
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
