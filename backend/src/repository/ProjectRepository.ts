import { Projects } from "../model/Projects";
import { IProject } from "../shared/model/IProject";
import { ParentRepository } from "./core/ParentRepository";

export class ProjectRepositoryDefault extends ParentRepository<IProject> {
  constructor() {
    super(Projects);
  }
}
