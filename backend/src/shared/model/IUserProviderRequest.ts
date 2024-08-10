import { IEntity } from "../types/IEntity";
import { IRouteMeta } from "../types/IRouteMeta";
import { ProviderType } from "../types/ProviderType";

export interface IUserProviderRequest extends IEntity {
  userId: string;
  enabled: boolean;
  provider: ProviderType;
  title: string;
  url: string;
}

export const UserProviderRequestRouteMeta: IRouteMeta = {
  path: "/user-provider-requests",
};
