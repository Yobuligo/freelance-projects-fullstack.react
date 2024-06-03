import { IProviderMeta } from "../providers/core/IProviderMeta";
import { ProviderClassType } from "../providers/core/ProviderClassType";
import { DecoratorInfo } from "../services/decoratorInfo/DecoratorInfo";
import { ProviderType } from "../shared/types/ProviderType";

export const Provider = <T extends ProviderClassType>(
  providerType: ProviderType,
  providerTitle: string
) => {
  return (target: T, _: any) => {
    const providerInfo: IProviderMeta = {
      classType: target,
      title: providerTitle,
      type: providerType,
    };
    DecoratorInfo.introduce(target, Provider, providerInfo);
  };
};
