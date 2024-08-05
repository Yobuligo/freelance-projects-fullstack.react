import { IUserOpportunity } from "../../../shared/model/IUserOpportunity";
import { IUserProjectChangeable } from "../types/IUserProjectChangeable";

export interface IProjectItemProps extends IUserProjectChangeable {
  isSelected: boolean;
  onChecked?: (userProject: IUserOpportunity) => void;
  onSelect?: (userProject: IUserOpportunity) => void;
  onUnchecked?: (userProject: IUserOpportunity) => void;
  userProject: IUserOpportunity;
  className?: string;
}
