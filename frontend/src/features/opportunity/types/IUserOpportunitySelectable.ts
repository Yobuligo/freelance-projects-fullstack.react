import { IUserOpportunity } from "../../../shared/model/IUserOpportunity";

export interface IUserOpportunitySelectable {
  selectedUserOpportunity: IUserOpportunity | undefined;
  onSelectUserOpportunity: (userOpportunity: IUserOpportunity) => void;
}
