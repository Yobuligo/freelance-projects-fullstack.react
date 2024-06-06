import { ISettings } from "../model/ISettings";
import { IUserConfig } from "../model/IUserConfig";
import { Value } from "../types/Value";

export interface IAppContext {
  errorMessage: Value<string>;
  settings: Value<ISettings>;
  userConfig: Value<IUserConfig>;
}
