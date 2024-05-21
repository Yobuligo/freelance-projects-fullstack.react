import { Provider } from "../../shared/types/Provider";
import { IProvider } from "./IProvider";

/**
 * The ProviderInfo gives specific information about the available providers.
 */
export interface IProviderInfo {
  findByType(type: Provider): IProvider | undefined;
}
