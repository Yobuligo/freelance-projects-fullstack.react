import { IUserProviderRequest } from "../../../shared/model/IUserProviderRequest";
import { IProviderRequestEvents } from "./IProviderRequestEvents";

export interface IProviderRequestItemProps extends IProviderRequestEvents {
  userProviderRequest: IUserProviderRequest;
}
