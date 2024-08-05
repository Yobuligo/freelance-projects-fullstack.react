import { UserProviderRequest } from "../model/sequelize/UserProviderRequest";
import { IUserProviderRequest } from "../shared/model/IUserProviderRequest";
import { Repository } from "./core/Repository";

export class UserProviderRequestRepo extends Repository<IUserProviderRequest> {
  constructor() {
    super(UserProviderRequest);
  }

  async findByUserId(userId: string): Promise<IUserProviderRequest[]> {
    const data = await this.model.findAll({ where: { userId } });
    return data.map((model) => model.toJSON());
  }
}