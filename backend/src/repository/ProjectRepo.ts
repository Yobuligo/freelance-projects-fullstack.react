import { Model } from "sequelize";
import { Opportunity } from "../model/Opportunity";
import { IOpportunity } from "../shared/model/IOpportunity";
import { IEntityDetails } from "../shared/types/IEntityDetails";
import { Repository } from "./core/Repository";

export class ProjectRepo extends Repository<IOpportunity> {
  constructor() {
    super(Opportunity);
  }

  /**
   * Inserts the given {@link projects} to the database, if they are not existing yet.
   * Skips insert, if a project with the same url already exists
   */
  async modify(projects: IEntityDetails<IOpportunity>[]): Promise<IOpportunity[]> {
    if (projects.length === 0) {
      return [];
    }

    const urls = projects.map((project) => project.url);
    const existingProjectData = await this.model.findAll({
      where: { url: urls },
    });
    const existingProjectUrls = existingProjectData.map(
      (row) => row.dataValues.url
    );
    const projectsToBeInserted = projects.filter(
      (project) => !existingProjectUrls.includes(project.url)
    );

    let createdProjects: Model<IOpportunity, IEntityDetails<IOpportunity>>[] = [];
    if (projectsToBeInserted.length > 0) {
      createdProjects = await this.model.bulkCreate(projectsToBeInserted);
    }

    return [
      ...existingProjectData.map((model) => model.toJSON()),
      ...createdProjects.map((model) => model.toJSON()),
    ];
  }
}
