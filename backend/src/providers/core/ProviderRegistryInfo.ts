import { Provider } from "../../decorators/Provider";
import { DecoratorInfo } from "../../services/decoratorInfo/DecoratorInfo";
import { IProviderMeta } from "./IProviderMeta";
import { ProviderType } from "../../shared/types/ProviderType";
import { ProviderRegistry } from "../ProviderRegistry";

class ProviderRegistryInfoDefault {
  findByType(providerType: ProviderType): IProviderMeta | undefined {
    for (let i = 0; i < ProviderRegistry.length; i++) {
      const providerConstructor = ProviderRegistry[i];
      const providerInfo = DecoratorInfo.find<IProviderMeta>(
        providerConstructor,
        Provider
      );
      if (providerInfo?.type === providerType) {
        return providerInfo;
      }
    }
  }

  findAll(): IProviderMeta[] {
    const providerInfos: IProviderMeta[] = [];
    for (let i = 0; i < ProviderRegistry.length; i++) {
      const providerConstructor = ProviderRegistry[i];
      const providerInfo = DecoratorInfo.find<IProviderMeta>(
        providerConstructor,
        Provider
      );
      if (providerInfo) {
        providerInfos.push(providerInfo);
      }
    }
    return providerInfos;
  }
}

export const ProviderRegistryInfo = new ProviderRegistryInfoDefault();
