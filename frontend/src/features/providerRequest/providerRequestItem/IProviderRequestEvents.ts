import { IUserProviderRequest } from "../../../shared/model/IUserProviderRequest";

export interface IProviderRequestEvents {
  onDelete?: (userProviderRequest: IUserProviderRequest) => void;
  onEnable?: (userProviderRequest: IUserProviderRequest) => void;
  onDisable?: (userProviderRequest: IUserProviderRequest) => void;
}
