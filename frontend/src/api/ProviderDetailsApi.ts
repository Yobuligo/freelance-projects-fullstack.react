import {
  IProviderDetails,
  ProviderDetailsMeta,
} from "../shared/model/IProviderDetails";
import { Repository } from "./core/Repository";

export class ProviderDetailsApi extends Repository<IProviderDetails> {
  constructor() {
    super(ProviderDetailsMeta);
  }
}
