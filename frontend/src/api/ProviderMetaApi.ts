import { IProviderMeta, ProviderMetaMeta } from "../shared/model/IProviderMeta";
import { RESTApi } from "./RESTApi";

class ProviderMetaApiDefault extends RESTApi {
  findAll(): Promise<IProviderMeta[]> {
    return this.get(`${this.host}${ProviderMetaMeta.path}`);
  }
}

export const ProviderMetaApi = new ProviderMetaApiDefault();
