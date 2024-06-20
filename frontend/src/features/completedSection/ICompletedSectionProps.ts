import { IProject } from "../../shared/model/IProject";
import { IProjectSelectable } from "../project/types/IProjectSelectable";

export interface ICompletedSectionProps extends IProjectSelectable {
  onChecked: (project: IProject) => void;
  onUnchecked: (project: IProject) => void;
  projects: IProject[];
}
