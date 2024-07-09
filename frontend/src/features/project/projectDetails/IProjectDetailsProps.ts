import { IProject } from "../../../shared/model/IProject";
import { IProjectChangeable } from "../types/IProjectChangeable";

export interface IProjectDetailsProps extends IProjectChangeable {
  project: IProject;
}
