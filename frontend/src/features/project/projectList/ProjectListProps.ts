import { IProject } from "../../../shared/model/IProject";
import { IProjectChangeable } from "../types/IProjectChangeable";
import { IProjectSelectable } from "../types/IProjectSelectable";

export interface IProjectListProps
  extends IProjectSelectable,
    IProjectChangeable {
  isLoading?: boolean;
  onChecked: (project: IProject) => void;
  onUnchecked: (project: IProject) => void;
  projects: IProject[];
}
