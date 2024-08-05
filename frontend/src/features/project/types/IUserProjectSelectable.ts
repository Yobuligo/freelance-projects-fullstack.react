import { IUserOpportunity } from "../../../shared/model/IUserOpportunity";

export interface IUserProjectSelectable {
  selectedUserProject: IUserOpportunity | undefined;
  onSelectUserProject: (userProject: IUserOpportunity) => void;
}
