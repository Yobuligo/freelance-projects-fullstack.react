import { ISettings } from "../model/ISettings";
import { IUserConfig } from "../model/IUserConfig";
import { ISession } from "../shared/model/ISession";
import { IUserProject } from "../shared/model/IUserProject";
import { Value } from "../types/Value";

export interface IAppContext {
  errorMessage: Value<string>;
  session: Value<ISession | undefined>;
  settings: Value<ISettings>;
  userConfig: Value<IUserConfig>;
  userProjects: Value<IUserProject[]>;
}
