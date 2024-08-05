import { IUserOpportunity } from "../../../shared/model/IUserOpportunity";

export interface IUserOpportunityChangeable {
  onChange?: (userOpportunity: IUserOpportunity) => void;
}
