import { IProject } from "../../../../shared/model/IProject";

export interface IProjectItemProps {
  onClick?: (project: IProject) => void;
  onStart?: (project: IProject) => void;
  onStop?: (project: IProject) => void;
  project: IProject;
}
