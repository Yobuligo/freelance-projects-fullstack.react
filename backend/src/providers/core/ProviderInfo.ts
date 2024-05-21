import { ProviderType } from "../../shared/types/ProviderType";
import { IProvider } from "./IProvider";
import { IProviderInfo } from "./IProviderInfo";

class ProviderInfoDefault implements IProviderInfo {
  findByType(provider: ProviderType): IProvider | undefined {
    throw new Error("Method not implemented.");
  }
}

export const ProviderInfo = new ProviderInfoDefault();
