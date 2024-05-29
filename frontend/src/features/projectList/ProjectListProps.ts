import { IProject } from "../../shared/model/IProject";

export interface IProjectListProps {
  onChecked: (project: IProject) => void;
  onUnchecked: (project: IProject) => void;
  projects: IProject[];
}
