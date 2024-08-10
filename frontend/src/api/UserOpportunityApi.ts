import {
  IUserOpportunity,
  UserOpportunitiesRouteMeta,
} from "../shared/model/IUserOpportunity";
import { Repository } from "./core/Repository";

export class UserOpportunityApi extends Repository<IUserOpportunity> {
  constructor() {
    super(UserOpportunitiesRouteMeta);
  }

  async findAllByProviderRequests(
    force?: boolean
  ): Promise<IUserOpportunity[]> {
    return await this.get(`${this.host}${UserOpportunitiesRouteMeta.path}`, {
      force,
    });
  }
}
