import { IProject } from "../../../shared/model/IProject";
import { IProjectSelectable } from "../types/IProjectSelectable";

export interface IProjectListProps extends IProjectSelectable {
  isLoading?: boolean;
  onChecked: (project: IProject) => void;
  onUnchecked: (project: IProject) => void;
  projects: IProject[];
}
