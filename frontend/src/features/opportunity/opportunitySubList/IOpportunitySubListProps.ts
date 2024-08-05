import { IUserOpportunity } from "../../../shared/model/IUserOpportunity";
import { IUserOpportunityChangeable } from "../types/IUserOpportunityChangeable";
import { IUserOpportunitySelectable } from "../types/IUserOpportunitySelectable";

export interface IOpportunitySubListProps
  extends IUserOpportunitySelectable,
    IUserOpportunityChangeable {
  collapsed: boolean;
  onChecked: (userOpportunity: IUserOpportunity) => void;
  onUnchecked: (userOpportunity: IUserOpportunity) => void;
  userOpportunities: IUserOpportunity[];
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  listAndItemColorClassName?: string;
}
