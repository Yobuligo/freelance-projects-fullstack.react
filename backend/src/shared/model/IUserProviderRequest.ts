import { IEntity } from "../types/IEntity";
import { IHavePath } from "../types/IHavePath";
import { ProviderType } from "../types/ProviderType";

export interface IUserProviderRequest extends IEntity {
  userId: string;
  enabled: boolean;
  provider: ProviderType;
  title: string;
  url: string;
}

export const UserProviderRequestMeta: IHavePath = {
  path: "/user-provider-requests",
};
