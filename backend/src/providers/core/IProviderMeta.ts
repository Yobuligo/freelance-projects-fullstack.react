import { ProviderClassType } from "./ProviderClassType";
import { IRouteMeta } from "../../shared/types/IRouteMeta";
import { ProviderType } from "../../shared/types/ProviderType";

export interface IProviderMeta {
  classType: ProviderClassType;
  title: string;
  type: ProviderType;
}

export const ProviderMetaMeta: IRouteMeta = { path: "/provider-metas" };
