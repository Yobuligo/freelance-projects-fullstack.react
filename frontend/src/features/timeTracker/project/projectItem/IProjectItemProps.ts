import { IProject } from "../../../../shared/model/IProject";

export interface IProjectItemProps {
  onDelete?: (project: IProject) => void;
  onClick?: (project: IProject) => void;
  onStart?: (project: IProject) => void;
  onStop?: (project: IProject) => void;
  project: IProject;
}
