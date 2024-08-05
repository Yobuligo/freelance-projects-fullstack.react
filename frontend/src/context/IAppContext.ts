import { IUserConfig } from "../model/IUserConfig";
import { ISession } from "../shared/model/ISession";
import { IUserOpportunity } from "../shared/model/IUserOpportunity";
import { IUserProviderRequest } from "../shared/model/IUserProviderRequest";
import { Value } from "../types/Value";

export interface IAppContext {
  errorMessage: Value<string>;
  session: Value<ISession | undefined>;
  userConfig: Value<IUserConfig>;
  userProjects: Value<IUserOpportunity[]>;
  userProviderRequests: Value<IUserProviderRequest[]>;
}
