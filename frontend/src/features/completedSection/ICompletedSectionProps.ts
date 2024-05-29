import { IProject } from "../../shared/model/IProject";

export interface ICompletedSectionProps {
  onChecked: (project: IProject) => void;
  onUnchecked: (project: IProject) => void;
  projects: IProject[];
}
