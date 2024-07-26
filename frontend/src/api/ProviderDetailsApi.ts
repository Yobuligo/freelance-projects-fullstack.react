import {
  IProviderDetails,
  ProviderDetailsMeta,
} from "../shared/model/IProviderDetails";
import { RESTApi } from "./core/RESTApi";

class ProviderDetailsApiDefault extends RESTApi {
  findAll(): Promise<IProviderDetails[]> {
    return this.get(`${this.host}${ProviderDetailsMeta.path}`);
  }
}

export const ProviderDetailsApi = new ProviderDetailsApiDefault();
