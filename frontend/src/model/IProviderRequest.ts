import { ProviderType } from "../shared/types/ProviderType";

export interface IProviderRequest {
  providerType: ProviderType;
  providerUrl: string;
}
