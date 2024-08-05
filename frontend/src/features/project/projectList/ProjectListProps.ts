import { IUserOpportunity } from "../../../shared/model/IUserOpportunity";
import { IUserProjectChangeable } from "../types/IUserProjectChangeable";
import { IUserProjectSelectable } from "../types/IUserProjectSelectable";

export interface IProjectListProps
  extends IUserProjectSelectable,
    IUserProjectChangeable {
  isLoading?: boolean;
  onChecked: (userProject: IUserOpportunity) => void;
  onUnchecked: (userProject: IUserOpportunity) => void;
  userProjects: IUserOpportunity[];
  listAndItemColorClassName?: string;
}
