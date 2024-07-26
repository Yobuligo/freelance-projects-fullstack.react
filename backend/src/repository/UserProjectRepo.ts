import { UserProjects } from "../model/UserProjects";
import { IUserProject } from "../shared/model/IUserProject";
import { Repository } from "./core/Repository";

export class UserProjectRepo extends Repository<IUserProject> {
  constructor() {
    super(UserProjects);
  }

  modify(){}
}
