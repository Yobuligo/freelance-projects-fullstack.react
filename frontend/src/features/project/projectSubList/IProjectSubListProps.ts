import { IUserProject } from "../../../shared/model/IUserProject";
import { IUserProjectChangeable } from "../types/IUserProjectChangeable";
import { IUserProjectSelectable } from "../types/IUserProjectSelectable";

export interface IProjectSubListProps
  extends IUserProjectSelectable,
    IUserProjectChangeable {
  collapsed: boolean;
  onChecked: (userProject: IUserProject) => void;
  onUnchecked: (userProject: IUserProject) => void;
  userProjects: IUserProject[];
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  listAndItemColorClassName?: string;
}
