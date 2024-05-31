import { ProviderType } from "../../../shared/types/ProviderType";

export interface IProviderRequestInputProps {
  onAdd?: (providerType: ProviderType, providerUrl: string) => void;
}
