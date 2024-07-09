import { IProject } from "../../../shared/model/IProject";
import { IProjectChangeable } from "../types/IProjectChangeable";

export interface IProjectItemProps extends IProjectChangeable {
  isSelected: boolean;
  onChecked?: (project: IProject) => void;
  onSelect?: (project: IProject) => void;
  onUnchecked?: (project: IProject) => void;
  project: IProject;
}
