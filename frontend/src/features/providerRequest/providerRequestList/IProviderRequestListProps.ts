import { IUserProviderRequest } from "../../../shared/model/IUserProviderRequest";
import { IProviderRequestEvents } from "../providerRequestItem/IProviderRequestEvents";

export interface IProviderRequestListProps extends IProviderRequestEvents {
  userProviderRequests: IUserProviderRequest[];
  isLoading: boolean;
}
