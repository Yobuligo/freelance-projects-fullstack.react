import { ProviderType } from "../shared/types/ProviderType";

export interface IProviderRequest {
  id: string;
  enabled: boolean;
  providerType: ProviderType;
  providerUrl: string;
  requestTitle: string;
}
