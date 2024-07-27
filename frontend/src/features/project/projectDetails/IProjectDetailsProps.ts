import { IUserProject } from "../../../shared/model/IUserProject";
import { IUserProjectChangeable } from "../types/IUserProjectChangeable";

export interface IProjectDetailsProps extends IUserProjectChangeable {
  userProject: IUserProject;
}
