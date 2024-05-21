import { ProviderClassType } from "../providers/types/ProviderClassType";
import { DecoratorInfo } from "../services/decoratorInfo/DecoratorInfo";
import { ProviderType } from "../shared/types/ProviderType";

export const Provider = <T extends ProviderClassType>(
  providerType: ProviderType
) => {
  return (target: T, _: any) => {
    DecoratorInfo.introduce(target, Provider, providerType);
  };
};
