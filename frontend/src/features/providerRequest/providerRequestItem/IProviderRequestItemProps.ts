import { IProviderRequest } from "../../../model/IProviderRequest";
import { IProviderRequestEvents } from "./IProviderRequestEvents";

export interface IProviderRequestItemProps extends IProviderRequestEvents {
  providerRequest: IProviderRequest;
}
