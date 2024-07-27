import { IUserProject } from "../../../shared/model/IUserProject";

export interface IUserProjectChangeable {
  onChange?: (userProject: IUserProject) => void;
}
