import { IEntity } from "../types/IEntity";
import { ProviderType } from "../types/ProviderType";

export interface IUserProviderRequest extends IEntity {
  userId: string;
  enabled: boolean;
  providerType: ProviderType;
  title: string;
  url: string;
}
