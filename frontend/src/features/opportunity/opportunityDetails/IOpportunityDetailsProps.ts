import { IUserOpportunity } from "../../../shared/model/IUserOpportunity";
import { IUserOpportunityChangeable } from "../types/IUserOpportunityChangeable";

export interface IOpportunityDetailsProps extends IUserOpportunityChangeable {
  userOpportunity: IUserOpportunity;
}
