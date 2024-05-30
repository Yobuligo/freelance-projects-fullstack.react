import { IProject } from "../../../shared/model/IProject";

export interface IProjectListProps {
  isLoading?: boolean
  onChecked: (project: IProject) => void;
  onUnchecked: (project: IProject) => void;
  projects: IProject[];
}
