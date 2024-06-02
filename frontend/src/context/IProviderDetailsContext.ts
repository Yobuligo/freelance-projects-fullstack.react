import { IProviderDetails } from "../shared/model/IProviderDetails";
import { Value } from "../types/Value";

export interface IProviderDetailsContext {
  providerDetails: Value<IProviderDetails[]>;
}
