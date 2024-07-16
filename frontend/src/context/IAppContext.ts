import { ISettings } from "../model/ISettings";
import { IUserConfig } from "../model/IUserConfig";
import { IProject } from "../shared/model/IProject";
import { ISession } from "../shared/model/ISession";
import { Value } from "../types/Value";

export interface IAppContext {
  errorMessage: Value<string>;
  projects: Value<IProject[]>;
  session: Value<ISession | undefined>;
  settings: Value<ISettings>;
  userConfig: Value<IUserConfig>;
}
