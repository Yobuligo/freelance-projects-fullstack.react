import { IProviderRequest } from "../../../model/IProviderRequest";

export interface IProviderRequestListProps {
  providerRequests: IProviderRequest[];
  onDelete?: (providerRequest: IProviderRequest) => void;
}
