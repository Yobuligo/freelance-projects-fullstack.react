import { Projects } from "../model/Projects";
import { IProject } from "../shared/model/IProject";
import { IEntityDetails } from "../shared/types/IEntityDetails";
import { Repository } from "./core/Repository";

export class ProjectRepo extends Repository<IProject> {
  constructor() {
    super(Projects);
  }

  async addAllIfNotExist(projects: IEntityDetails<IProject>[]) {
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
