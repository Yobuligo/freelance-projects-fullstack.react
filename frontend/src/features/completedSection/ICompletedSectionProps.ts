import { IProject } from "../../shared/model/IProject";
import { IProjectActivatable } from "../project/types/IProjectActivatable";

export interface ICompletedSectionProps extends IProjectActivatable {
  onChecked: (project: IProject) => void;
  onUnchecked: (project: IProject) => void;
  projects: IProject[];
}
