import { IProviderMeta, ProviderMetaMeta } from "../shared/model/IProviderMeta";
import { RESTApi } from "./RESTApi";

class ProviderMetaApiDefault extends RESTApi {
  findAll(): Promise<IProviderMeta[]> {
    return this.get(`http://localhost:5000/api${ProviderMetaMeta.path}`);
  }
}

export const ProviderMetaApi = new ProviderMetaApiDefault();
