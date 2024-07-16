import { IProject } from "../../../shared/model/IProject";
import { IProjectChangeable } from "../types/IProjectChangeable";
import { IProjectSelectable } from "../types/IProjectSelectable";

export interface IProjectSubListProps
  extends IProjectSelectable,
    IProjectChangeable {
  collapsed: boolean;
  onChecked: (project: IProject) => void;
  onUnchecked: (project: IProject) => void;
  projects: IProject[];
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  listAndItemColorClassName?: string;
}
