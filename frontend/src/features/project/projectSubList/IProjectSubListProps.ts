import { IUserOpportunity } from "../../../shared/model/IUserOpportunity";
import { IUserProjectChangeable } from "../types/IUserProjectChangeable";
import { IUserProjectSelectable } from "../types/IUserProjectSelectable";

export interface IProjectSubListProps
  extends IUserProjectSelectable,
    IUserProjectChangeable {
  collapsed: boolean;
  onChecked: (userProject: IUserOpportunity) => void;
  onUnchecked: (userProject: IUserOpportunity) => void;
  userProjects: IUserOpportunity[];
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  listAndItemColorClassName?: string;
}
