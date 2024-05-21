import { ProviderConstructor } from "../providers/core/ProviderConstructor";
import { DecoratorInfo } from "../services/decoratorInfo/DecoratorInfo";
import { ProviderType } from "../shared/types/ProviderType";

export const Provider = <T extends ProviderConstructor>(
  providerType: ProviderType
) => {
  return (target: T) => {
    DecoratorInfo.introduce(target, Provider, providerType);
  };
};
