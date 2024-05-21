import { ProviderType } from "../../shared/types/ProviderType";
import { IProvider } from "./IProvider";

/**
 * The ProviderInfo gives specific information about the available providers.
 */
export interface IProviderInfo {
  findByType(providerType: ProviderType): IProvider | undefined;
}
