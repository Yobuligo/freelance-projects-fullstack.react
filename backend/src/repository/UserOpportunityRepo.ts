import { WhereOptions } from "sequelize";
import { Opportunity } from "../model/sequelize/Opportunity";
import { UserOpportunity } from "../model/sequelize/UserOpportunity";
import { IOpportunity } from "../shared/model/IOpportunity";
import { IUserOpportunity } from "../shared/model/IUserOpportunity";
import { IEntityDetails } from "../shared/types/IEntityDetails";
import { ExcludeRefs } from "../types/ExcludeRefs";
import { Repository } from "./core/Repository";

export class UserOpportunityRepo extends Repository<IUserOpportunity> {
  constructor() {
    super(UserOpportunity);
  }

  /**
   * Returns all user opportunities by the given {@link userId}.
   */
  async findByUserId(userId: string): Promise<IUserOpportunity[]> {
    const data = await this.model.findAll({
      where: { userId },
      include: [Opportunity],
    });
    return data.map((model) => model.toJSON());
  }

  /**
   * Inserts new user opportunities for the given {@link opportunities}. Skips opportunities, if a user opportunity for one or more opportunity id already exist.
   */
  async modify(
    userId: string,
    opportunities: IOpportunity[]
  ): Promise<IUserOpportunity[]> {
    if (opportunities.length === 0) {
      return [];
    }

    // find existing user opportunities
    const opportunityIds = opportunities.map((opportunity) => opportunity.id);
    const existingUserOpportunities = await this.model.findAll({
      where: { opportunityId: [opportunityIds] } as WhereOptions,
      include: [Opportunity],
    });

    // find opportunities which are currently not saved as user opportunity
    const existingOpportunityIds = existingUserOpportunities.map(
      (userOpportunity) => (userOpportunity.dataValues as any).opportunityId
    );

    // find opportunities, which are currently not loaded as user opportunities
    const opportunitiesToBeInserted = opportunities.filter(
      (opportunity) => !existingOpportunityIds.includes(opportunity.id)
    );

    // create user opportunities for those, who are currently not loaded / persisted
    if (opportunitiesToBeInserted.length > 0) {
      const userOpportunities: IEntityDetails<IUserOpportunity>[] =
        opportunitiesToBeInserted.map((opportunity) =>
          this.createUserOpportunity(userId, opportunity)
        );
      await this.model.bulkCreate(
        userOpportunities as IEntityDetails<IUserOpportunity>[]
      );
    }

    const userOpportunities = await this.findByUserId(userId);
    return userOpportunities;
  }

  private createUserOpportunity(
    userId: string,
    opportunity: IOpportunity
  ): IEntityDetails<IUserOpportunity> {
    const userOpportunity: ExcludeRefs<IEntityDetails<IUserOpportunity>> = {
      applied: false,
      completed: false,
      rejected: false,
      userId: userId,
    };

    (userOpportunity as any)["opportunityId"] = opportunity.id;
    return userOpportunity as IEntityDetails<IUserOpportunity>;
  }
}
