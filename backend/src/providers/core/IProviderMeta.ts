import { ProviderClassType } from "./ProviderClassType";
import { IHavePath } from "../../shared/types/IHavePath";
import { ProviderType } from "../../shared/types/ProviderType";

export interface IProviderMeta {
  classType: ProviderClassType;
  title: string;
  type: ProviderType;
}

export const ProviderMetaMeta: IHavePath = { path: "/provider-metas" };
