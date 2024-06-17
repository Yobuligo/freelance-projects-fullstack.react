import { IProviderRequest } from "../../../model/IProviderRequest";
import { IProviderRequestEvents } from "../providerRequestItem/IProviderRequestEvents";

export interface IProviderRequestListProps extends IProviderRequestEvents {
  providerRequests: IProviderRequest[];
}
