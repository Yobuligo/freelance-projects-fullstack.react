import { WhereOptions } from "sequelize";
import { Projects } from "../model/Projects";
import { UserProjects } from "../model/UserProjects";
import { IProject } from "../shared/model/IProject";
import { IUserProject } from "../shared/model/IUserProject";
import { IEntityDetails } from "../shared/types/IEntityDetails";
import { ExcludeRefs } from "../types/ExcludeRefs";
import { Repository } from "./core/Repository";

export class UserProjectRepo extends Repository<IUserProject> {
  constructor() {
    super(UserProjects);
  }

  /**
   * Returns all user projects by the given {@link userId}.
   */
  async findByUserId(userId: string): Promise<IUserProject[]> {
    const data = await this.model.findAll({
      where: { userId },
      include: [Projects],
    });
    return data.map((model) => model.toJSON());
  }

  /**
   * Inserts new user projects for the given {@link projects}. Skips projects, if a user project for one or more project id already exist.
   */
  async modify(userId: string, projects: IProject[]): Promise<IUserProject[]> {
    if (projects.length === 0) {
      return [];
    }

    // find existing user projects
    const projectIds = projects.map((project) => project.id);
    const existingUserProjects = await this.model.findAll({
      where: { projectId: [projectIds] } as WhereOptions,
      include: [Projects],
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
      const userProjects: IEntityDetails<IUserProject>[] =
        projectsToBeInserted.map((project) =>
          this.createUserProject(userId, project)
        );
      await this.model.bulkCreate(
        userProjects as IEntityDetails<IUserProject>[]
      );
    }

    const userProjects = await this.findByUserId(userId);
    return userProjects;
  }

  async updateAll(userProjects: IUserProject[]) {
    await this.model.bulkCreate(userProjects, {
      updateOnDuplicate: [
        "applicationType",
        "applied",
        "appliedAt",
        "completed",
        "completedAt",
        "contact",
        "createdAt",
        "rejected",
        "rejectedAt",
        "updatedAt",
      ],
    });
  }

  private createUserProject(
    userId: string,
    project: IProject
  ): IEntityDetails<IUserProject> {
    const userProject: ExcludeRefs<IEntityDetails<IUserProject>> = {
      applied: false,
      completed: false,
      rejected: false,
      userId: userId,
    };

    (userProject as any)["projectId"] = project.id;
    return userProject as IEntityDetails<IUserProject>;
  }
}
