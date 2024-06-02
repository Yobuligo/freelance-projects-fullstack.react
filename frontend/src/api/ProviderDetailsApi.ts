import {
  IProviderDetails,
  ProviderDetailsMeta,
} from "../shared/model/IProviderDetails";
import { RESTApi } from "./RESTApi";

class ProviderDetailsApiDefault extends RESTApi {
  findAll(): Promise<IProviderDetails> {
    return this.get(`http://localhost:5000/api${ProviderDetailsMeta.path}`);
  }
}

export const ProviderDetailsApi = new ProviderDetailsApiDefault();
