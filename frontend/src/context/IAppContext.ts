import { IUserConfig } from "../model/IUserConfig";
import { Value } from "../types/Value";

export interface IAppContext {
  userConfig: Value<IUserConfig>;
}
