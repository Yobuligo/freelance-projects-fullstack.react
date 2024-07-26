import { Projects } from "../model/Projects";
import { IProject } from "../shared/model/IProject";
import { IEntityDetails } from "../shared/types/IEntityDetails";
import { Repository } from "./core/Repository";

export class ProjectRepo extends Repository<IProject> {
  constructor() {
    super(Projects);
  }

  /**
   * Inserts the given {@link projects} to the database, if they are not existing yet.
   * Skips insert, if a project with the same url already exists
   */
  async modify(projects: IEntityDetails<IProject>[]) {
    if (projects.length === 0) {
      return;
    }

    const urls = projects.map((project) => project.url);
    const existingProjectData = await this.model.findAll({
      where: { url: urls },
      attributes: ["url"],
    });
    const existingProjectUrls = existingProjectData.map(
      (row) => row.dataValues.url
    );
    const projectsToBeInserted = projects.filter(
      (project) => !existingProjectUrls.includes(project.url)
    );
    if (projectsToBeInserted.length > 0) {
      await this.model.bulkCreate(projectsToBeInserted);
    }
  }
}
