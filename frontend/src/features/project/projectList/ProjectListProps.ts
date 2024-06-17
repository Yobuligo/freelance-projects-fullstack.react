import { IProject } from "../../../shared/model/IProject";
import { IProjectActivatable } from "../types/IProjectActivatable";

export interface IProjectListProps extends IProjectActivatable {
  isLoading?: boolean;
  onChecked: (project: IProject) => void;
  onUnchecked: (project: IProject) => void;
  projects: IProject[];
}
