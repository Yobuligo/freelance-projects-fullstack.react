import { Provider } from "../../decorators/Provider";
import { DecoratorInfo } from "../../services/decoratorInfo/DecoratorInfo";
import { NotSupportedError } from "../../shared/errors/NotSupportedError";
import { ProviderType } from "../../shared/types/ProviderType";
import { ProviderRegistry } from "../ProviderRegistry";
import { IProvider } from "./IProvider";
import { IProviderFactory } from "./IProviderFactory";

class ProviderFactoryDefault implements IProviderFactory {
  createByType(providerType: ProviderType): IProvider {
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

    throw new NotSupportedError(
      `Error while creating Provider '${providerType}'. No provider for for this type.`
    );
  }
}

export const ProviderFactory = new ProviderFactoryDefault();
