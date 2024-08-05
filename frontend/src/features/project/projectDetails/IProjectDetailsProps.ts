import { IUserOpportunity } from "../../../shared/model/IUserOpportunity";
import { IUserProjectChangeable } from "../types/IUserProjectChangeable";

export interface IProjectDetailsProps extends IUserProjectChangeable {
  userProject: IUserOpportunity;
}
