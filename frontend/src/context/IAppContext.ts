import { ISettings } from "../model/ISettings";
import { IUserConfig } from "../model/IUserConfig";
import { IProject } from "../shared/model/IProject";
import { Value } from "../types/Value";

export interface IAppContext {
  errorMessage: Value<string>;
  projects: Value<IProject[]>;
  settings: Value<ISettings>;
  userConfig: Value<IUserConfig>;
}
