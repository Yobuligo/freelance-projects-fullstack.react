import { IProject, ProjectMeta } from "../shared/model/IProject";
import { Repository } from "./core/Repository";

export class ProjectApi extends Repository<IProject> {
  constructor() {
    super(ProjectMeta);
  }
}
