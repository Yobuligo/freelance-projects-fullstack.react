import {
  IUserOpportunity,
  UserOpportunitiesRouteMeta,
} from "../shared/model/IUserOpportunity";
import { EntityRepository } from "./core/EntityRepository";

export class UserOpportunityApi extends EntityRepository<IUserOpportunity> {
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
