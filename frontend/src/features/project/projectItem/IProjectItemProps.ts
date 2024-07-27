import { IUserProject } from "../../../shared/model/IUserProject";
import { IUserProjectChangeable } from "../types/IUserProjectChangeable";

export interface IProjectItemProps extends IUserProjectChangeable {
  isSelected: boolean;
  onChecked?: (userProject: IUserProject) => void;
  onSelect?: (userProject: IUserProject) => void;
  onUnchecked?: (userProject: IUserProject) => void;
  userProject: IUserProject;
  className?: string;
}
