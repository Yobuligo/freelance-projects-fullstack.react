import { IProject } from "../../shared/model/IProject";

export interface IProjectProps {
  onChecked?: (project: IProject) => void;
  onUnchecked?: (project: IProject) => void;
  project: IProject;
}
