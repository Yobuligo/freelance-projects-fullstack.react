import { IProject } from "../../../shared/model/IProject";

export interface IProjectItemProps {
  onChecked?: (project: IProject) => void;
  onUnchecked?: (project: IProject) => void;
  project: IProject;
}
