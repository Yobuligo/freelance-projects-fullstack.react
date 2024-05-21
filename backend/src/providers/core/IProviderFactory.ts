import { ProviderType } from "../../shared/types/ProviderType";
import { IProvider } from "./IProvider";

/**
 * The ProviderFactory creates {@link IProvider}.
 */
export interface IProviderFactory {
  createByType(providerType: ProviderType): IProvider;
}
