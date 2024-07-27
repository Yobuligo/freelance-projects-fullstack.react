import { IUserProject } from "../../../shared/model/IUserProject";

export interface IUserProjectSelectable {
  selectedUserProject: IUserProject | undefined;
  onSelectUserProject: (userProject: IUserProject) => void;
}
