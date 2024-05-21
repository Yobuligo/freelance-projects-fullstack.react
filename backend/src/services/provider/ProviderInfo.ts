import { Provider } from "../../shared/types/Provider";
import { IProvider } from "./IProvider";
import { IProviderInfo } from "./IProviderInfo";

class ProviderInfoDefault implements IProviderInfo {
  findByType(provider: Provider): IProvider | undefined {
    throw new Error("Method not implemented.");
  }
}

export const ProviderInfo = new ProviderInfoDefault();
