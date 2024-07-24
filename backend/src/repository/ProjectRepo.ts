import { Projects } from "../model/Projects";
import { IProject } from "../shared/model/IProject";
import { Repository } from "./core/Repository";

export class ProjectRepo extends Repository<IProject> {
  constructor() {
    super(Projects);
  }
}
