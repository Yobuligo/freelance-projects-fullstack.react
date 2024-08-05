import { IUserOpportunity } from "../../../shared/model/IUserOpportunity";
import { IUserOpportunityChangeable } from "../types/IUserOpportunityChangeable";
import { IUserOpportunitySelectable } from "../types/IUserOpportunitySelectable";

export interface IOpportunityListProps
  extends IUserOpportunitySelectable,
    IUserOpportunityChangeable {
  isLoading?: boolean;
  onChecked: (userOpportunity: IUserOpportunity) => void;
  onUnchecked: (userOpportunity: IUserOpportunity) => void;
  userOpportunities: IUserOpportunity[];
  listAndItemColorClassName?: string;
}
