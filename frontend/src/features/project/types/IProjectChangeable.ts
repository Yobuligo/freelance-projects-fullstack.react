import { IProject } from "../../../shared/model/IProject";

export interface IProjectChangeable {
  onChange?: (project: IProject) => void;
}
