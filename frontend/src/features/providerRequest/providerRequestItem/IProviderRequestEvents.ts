import { IProviderRequest } from "../../../model/IProviderRequest";

export interface IProviderRequestEvents {
  onDelete?: (providerRequest: IProviderRequest) => void;
  onEnable?: (providerRequest: IProviderRequest) => void;
  onDisable?: (providerRequest: IProviderRequest) => void;
}
