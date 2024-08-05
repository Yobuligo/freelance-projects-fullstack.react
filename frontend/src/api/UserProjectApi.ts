import { IProviderRequests } from "../shared/model/IProviderRequests";
import { IUserOpportunity, UserOpportunitiesMeta } from "../shared/model/IUserOpportunity";
import { IUserProviderRequest } from "../shared/model/IUserProviderRequest";
import { Repository } from "./core/Repository";

export class UserProjectApi extends Repository<IUserOpportunity> {
  constructor() {
    super(UserOpportunitiesMeta);
  }

  async findAllByProviderRequests(
    userProviderRequests: IUserProviderRequest[],
    force?: boolean
  ): Promise<IUserOpportunity[]> {
    const requests = this.convertToBackendFormat(userProviderRequests, force);
    return await this.post(`${this.host}${UserOpportunitiesMeta.path}`, requests);
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
