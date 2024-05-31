import { ISettings } from "../model/ISettings";
import { IUserConfig } from "../model/IUserConfig";
import { Value } from "../types/Value";

export interface IAppContext {
  settings: Value<ISettings>;
  userConfig: Value<IUserConfig>;
}
