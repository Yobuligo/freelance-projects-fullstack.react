import { WhereOptions } from "sequelize";
import { Opportunity } from "../model/sequelize/Opportunity";
import { UserOpportunity } from "../model/sequelize/UserOpportunity";
import { IOpportunity } from "../shared/model/IOpportunity";
import { IUserOpportunity } from "../shared/model/IUserOpportunity";
import { IEntityDetails } from "../shared/types/IEntityDetails";
import { ExcludeRefs } from "../types/ExcludeRefs";
import { Repository } from "./core/Repository";

export class UserProjectRepo extends Repository<IUserOpportunity> {
  constructor() {
    super(UserOpportunity);
  }

  /**
   * Returns all user projects by the given {@link userId}.
   */
  async findByUserId(userId: string): Promise<IUserOpportunity[]> {
    const data = await this.model.findAll({
      where: { userId },
      include: [Opportunity],
    });
    return data.map((model) => model.toJSON());
  }

  /**
   * Inserts new user projects for the given {@link projects}. Skips projects, if a user project for one or more project id already exist.
   */
  async modify(userId: string, projects: IOpportunity[]): Promise<IUserOpportunity[]> {
    if (projects.length === 0) {
      return [];
    }

    // find existing user projects
    const projectIds = projects.map((project) => project.id);
    const existingUserProjects = await this.model.findAll({
      where: { projectId: [projectIds] } as WhereOptions,
      include: [Opportunity],
    });

    // find projects which are currently not saved as user project
    const existingProjectIds = existingUserProjects.map(
      (userProject) => (userProject.dataValues as any).projectId
    );

    // find projects, which are currently not loaded as user projects
    const projectsToBeInserted = projects.filter(
      (project) => !existingProjectIds.includes(project.id)
    );

    // create user projects for those, who are currently not loaded / persisted
    if (projectsToBeInserted.length > 0) {
      const userProjects: IEntityDetails<IUserOpportunity>[] =
        projectsToBeInserted.map((project) =>
          this.createUserProject(userId, project)
        );
      await this.model.bulkCreate(
        userProjects as IEntityDetails<IUserOpportunity>[]
      );
    }

    const userProjects = await this.findByUserId(userId);
    return userProjects;
  }

  private createUserProject(
    userId: string,
    project: IOpportunity
  ): IEntityDetails<IUserOpportunity> {
    const userProject: ExcludeRefs<IEntityDetails<IUserOpportunity>> = {
      applied: false,
      completed: false,
      rejected: false,
      userId: userId,
    };

    (userProject as any)["projectId"] = project.id;
    return userProject as IEntityDetails<IUserOpportunity>;
  }
}
