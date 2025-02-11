import { Model } from "sequelize";
import { Opportunity } from "../model/sequelize/Opportunity";
import { IOpportunity } from "../shared/model/IOpportunity";
import { IEntityDetails } from "../shared/types/IEntityDetails";
import { Repository } from "./core/Repository";

export class OpportunityRepo extends Repository<IOpportunity> {
  constructor() {
    super(Opportunity);
  }

  /**
   * Inserts the given {@link opportunities} to the database, if they are not existing yet.
   * Skips insert, if an opportunity with the same url already exists
   */
  async modify(
    opportunities: IEntityDetails<IOpportunity>[]
  ): Promise<IOpportunity[]> {
    if (opportunities.length === 0) {
      return [];
    }

    const urls = opportunities.map((opportunity) => opportunity.url);
    const existingOpportunityData = await this.model.findAll({
      where: { url: urls },
    });
    // extract urls from opportunities and convert urls to lowercase to allow for url case changes
    const existingOpportunityUrls = existingOpportunityData.map(
      (row) =>  row.dataValues.url
    );
    const opportunitiesToBeInserted = opportunities.filter(
      (opportunity) => !existingOpportunityUrls.includes(opportunity.url.toLowerCase())
    );

    let createdOpportunities: Model<
      IOpportunity,
      IEntityDetails<IOpportunity>
    >[] = [];
    if (opportunitiesToBeInserted.length > 0) {
      try {
        createdOpportunities = await this.model.bulkCreate(
          opportunitiesToBeInserted
        );
      } catch (error) {
        console.log(error)
      }
    }

    return [
      ...existingOpportunityData.map((model) => model.toJSON()),
      ...createdOpportunities.map((model) => model.toJSON()),
    ];
  }
}
