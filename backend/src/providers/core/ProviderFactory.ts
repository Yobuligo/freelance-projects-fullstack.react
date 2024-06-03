import { NotSupportedError } from "../../shared/errors/NotSupportedError";
import { ProviderType } from "../../shared/types/ProviderType";
import { IProvider } from "./IProvider";
import { IProviderFactory } from "./IProviderFactory";
import { ProviderRegistryInfo } from "./ProviderRegistryInfo";

class ProviderFactoryDefault implements IProviderFactory {
  createByType(providerType: ProviderType): IProvider {
    const providerInfo = ProviderRegistryInfo.findByType(providerType);
    if (providerInfo) {
      return new providerInfo.classType();
    }

    throw new NotSupportedError(
      `Error while creating Provider '${providerType}'. No provider for for this type.`
    );
  }
}

export const ProviderFactory = new ProviderFactoryDefault();
