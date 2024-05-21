import { ProviderConstructor } from "../providers/core/ProviderConstructor";
import { ProviderType } from "../shared/types/ProviderType";

export const Provider = <T extends ProviderConstructor>(
  providerType: ProviderType
) => {
  return (target: T) => {};
};
