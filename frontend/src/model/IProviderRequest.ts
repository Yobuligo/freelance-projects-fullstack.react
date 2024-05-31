import { ProviderType } from "../shared/types/ProviderType";

export interface IProviderRequest {
  id: string;
  providerType: ProviderType;
  providerUrl: string;
}
