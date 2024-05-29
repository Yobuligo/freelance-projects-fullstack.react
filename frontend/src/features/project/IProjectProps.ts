import { IProject } from "../../shared/model/IProject";

export interface IProjectProps {
  checked: boolean;
  onChecked?: (project: IProject) => void;
  project: IProject;
}
