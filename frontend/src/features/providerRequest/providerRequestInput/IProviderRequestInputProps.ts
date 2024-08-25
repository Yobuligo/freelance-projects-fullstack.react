import { ProviderType } from "../../../shared/types/ProviderType";
import { IHaveClassName } from "../../../types/IHaveClassName";

export interface IProviderRequestInputProps extends IHaveClassName {
  onAdd?: (
    providerType: ProviderType,
    providerUrl: string,
    requestTitle: string
  ) => void;
}
