import { IProject } from "../../../shared/model/IProject";

export interface IProjectItemProps {
  isSelected: boolean;
  onChecked?: (project: IProject) => void;
  onSelect?: (project: IProject) => void;
  onUnchecked?: (project: IProject) => void;
  project: IProject;
}
