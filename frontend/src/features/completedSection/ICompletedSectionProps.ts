import { IProject } from "../../shared/model/IProject";
import { IProjectChangeable } from "../project/types/IProjectChangeable";
import { IProjectSelectable } from "../project/types/IProjectSelectable";

export interface ICompletedSectionProps
  extends IProjectSelectable,
    IProjectChangeable {
  onChecked: (project: IProject) => void;
  onUnchecked: (project: IProject) => void;
  projects: IProject[];
}
