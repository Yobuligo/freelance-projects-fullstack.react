import { IHavePath } from "../types/IHavePath";
import { ProviderType } from "../types/ProviderType";

export interface IProviderRequests {
  force?: boolean;
  providerType: ProviderType;
  urls: string[];
}

export const ProviderRequestMeta: IHavePath = { path: "/provider-requests" };
