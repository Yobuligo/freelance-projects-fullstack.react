import { IProviderRequest } from "../model/IProviderRequest";
import { IProviderRequests } from "../shared/model/IProviderRequests";
import { IUserProject, UserProjectMeta } from "../shared/model/IUserProject";
import { Repository } from "./core/Repository";

export class UserProjectApi extends Repository<IUserProject> {
  constructor() {
    super(UserProjectMeta);
  }

  async findAllByProviderRequests(
    providerRequests: IProviderRequest[],
    force?: boolean
  ): Promise<IUserProject[]> {
    const requests = this.convertToBackendFormat(providerRequests, force);
    return await this.post(`${this.host}${UserProjectMeta.path}`, requests);
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
