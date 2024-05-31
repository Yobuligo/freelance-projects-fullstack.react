import { IProviderRequest } from "../../../model/IProviderRequest";

export interface IProviderRequestItemProps {
  providerRequest: IProviderRequest;
  onDelete?: (providerRequest: IProviderRequest) => void;
}
