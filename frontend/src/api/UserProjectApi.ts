import { IProviderRequests } from "../shared/model/IProviderRequests";
import { IUserProject, UserProjectMeta } from "../shared/model/IUserProject";
import { IUserProviderRequest } from "../shared/model/IUserProviderRequest";
import { Repository } from "./core/Repository";

export class UserProjectApi extends Repository<IUserProject> {
  constructor() {
    super(UserProjectMeta);
  }

  async findAllByProviderRequests(
    userProviderRequests: IUserProviderRequest[],
    force?: boolean
  ): Promise<IUserProject[]> {
    const requests = this.convertToBackendFormat(userProviderRequests, force);
    return await this.post(`${this.host}${UserProjectMeta.path}`, requests);
  }

  /**
   * Converts the provider requests to the format which is expected from the backend.
   */
  private convertToBackendFormat(
    userProviderRequests: IUserProviderRequest[],
    force?: boolean
  ): IProviderRequests[] {
    const requests: IProviderRequests[] = [];

    userProviderRequests.forEach((userProviderRequest) => {
      const request = requests.find(
        (request) => request.providerType === userProviderRequest.provider
      );

      if (request) {
        request.urls.push(userProviderRequest.url);
      } else {
        requests.push({
          force: force,
          providerType: userProviderRequest.provider,
          urls: [userProviderRequest.url],
        });
      }
    });

    return requests;
  }
}
