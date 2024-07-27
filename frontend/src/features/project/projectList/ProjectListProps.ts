import { IUserProject } from "../../../shared/model/IUserProject";
import { IUserProjectChangeable } from "../types/IUserProjectChangeable";
import { IUserProjectSelectable } from "../types/IUserProjectSelectable";

export interface IProjectListProps
  extends IUserProjectSelectable,
    IUserProjectChangeable {
  isLoading?: boolean;
  onChecked: (userProject: IUserProject) => void;
  onUnchecked: (userProject: IUserProject) => void;
  userProjects: IUserProject[];
  listAndItemColorClassName?: string;
}
