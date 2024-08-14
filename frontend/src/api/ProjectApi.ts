import { IProject, ProjectRouteMeta } from "../shared/model/IProject";
import { EntityRepository } from "./core/EntityRepository";

export class ProjectApi extends EntityRepository<IProject> {
  constructor() {
    super(ProjectRouteMeta);
  }
}
