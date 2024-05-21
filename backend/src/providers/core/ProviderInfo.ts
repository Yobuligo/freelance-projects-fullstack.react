import { Provider } from "../../decorators/Provider";
import { DecoratorInfo } from "../../services/decoratorInfo/DecoratorInfo";
import { ProviderType } from "../../shared/types/ProviderType";
import { ProviderRegistry } from "../ProviderRegistry";
import { IProvider } from "./IProvider";
import { IProviderInfo } from "./IProviderInfo";

class ProviderInfoDefault implements IProviderInfo {
  findByType(providerType: ProviderType): IProvider | undefined {
    for (let i = 0; i < ProviderRegistry.length; i++) {
      const providerConstructor = ProviderRegistry[i];
      const registryProviderType = DecoratorInfo.find(
        providerConstructor,
        Provider
      );
      if (registryProviderType === providerType) {
        return new providerConstructor();
      }
    }
  }
}

export const ProviderInfo = new ProviderInfoDefault();
