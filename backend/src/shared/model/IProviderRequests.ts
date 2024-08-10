import { IRouteMeta } from "../types/IRouteMeta";
import { ProviderType } from "../types/ProviderType";

export interface IProviderRequests {
  force?: boolean;
  providerType: ProviderType;
  urls: string[];
}

export const ProviderRequestRouteMeta: IRouteMeta = { path: "/provider-requests" };
