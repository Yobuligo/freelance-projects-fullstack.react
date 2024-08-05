import { IUserOpportunity } from "../../../shared/model/IUserOpportunity";
import { IUserOpportunityChangeable } from "../types/IUserOpportunityChangeable";

export interface IOpportunityItemProps extends IUserOpportunityChangeable {
  isSelected: boolean;
  onChecked?: (userOpportunity: IUserOpportunity) => void;
  onSelect?: (userOpportunity: IUserOpportunity) => void;
  onUnchecked?: (userOpportunity: IUserOpportunity) => void;
  userOpportunity: IUserOpportunity;
  className?: string;
}
