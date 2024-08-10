import { IRouteMeta } from "../types/IRouteMeta";
import { ProviderType } from "../types/ProviderType";

export interface IProviderDetails {
  title: string;
  type: ProviderType;
}

export const ProviderDetailsRouteMeta: IRouteMeta = { path: "/provider-details" };
