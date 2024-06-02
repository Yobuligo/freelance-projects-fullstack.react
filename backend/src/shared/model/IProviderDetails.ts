import { IHavePath } from "../types/IHavePath";
import { ProviderType } from "../types/ProviderType";

export interface IProviderDetails {
  title: string;
  type: ProviderType;
}

export const ProviderDetailsMeta: IHavePath = { path: "/provider-details" };
