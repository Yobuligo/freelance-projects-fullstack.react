import { Project } from "../model/sequelize/Project";
import { Task } from "../model/sequelize/Task";
import { IProject } from "../shared/model/IProject";
import { Repository } from "./core/Repository";

export class ProjectRepo extends Repository<IProject> {
  constructor() {
    super(Project);
  }

  async findByUserId(userId: string): Promise<IProject[]> {
    const data = await Project.findAll({ where: { userId }, include: [Task] });
    return data.map((model) => model.toJSON());
  }
}
