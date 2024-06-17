import { IProject } from "../../../shared/model/IProject";

export interface IProjectItemProps {
  isActive: boolean;
  onChecked?: (project: IProject) => void;
  onUnchecked?: (project: IProject) => void;
  onActivate?: (project: IProject) => void;
  project: IProject;
}
