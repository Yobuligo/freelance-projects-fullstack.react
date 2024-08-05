import {
  IUserOpportunity,
  UserOpportunitiesMeta,
} from "../shared/model/IUserOpportunity";
import { Repository } from "./core/Repository";

export class UserOpportunityApi extends Repository<IUserOpportunity> {
  constructor() {
    super(UserOpportunitiesMeta);
  }

  async findAllByProviderRequests(
    force?: boolean
  ): Promise<IUserOpportunity[]> {
    return await this.get(`${this.host}${UserOpportunitiesMeta.path}`, {
      force,
    });
  }
}
