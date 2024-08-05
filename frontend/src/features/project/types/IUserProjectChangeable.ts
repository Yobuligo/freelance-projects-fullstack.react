import { IUserOpportunity } from "../../../shared/model/IUserOpportunity";

export interface IUserProjectChangeable {
  onChange?: (userProject: IUserOpportunity) => void;
}
