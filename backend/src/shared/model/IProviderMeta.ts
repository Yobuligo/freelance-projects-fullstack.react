import { ProviderClassType } from "../types/ProviderClassType";
import { IHavePath } from "../types/IHavePath";
import { ProviderType } from "../types/ProviderType";

export interface IProviderMeta {
  classType: ProviderClassType;
  title: string;
  type: ProviderType;
}

export const ProviderMetaMeta: IHavePath = { path: "/provider-metas" };
