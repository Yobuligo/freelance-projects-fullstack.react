import { ICredentials } from "../shared/model/ICredentials";
import { ISession } from "../shared/model/ISession";
import { RESTApi } from "./core/RESTApi";

export class UserApi extends RESTApi {
  login(credentials: ICredentials): Promise<ISession> {
    return this.post(`${this.host}/users/login`, credentials);
  }

  logout(session: ISession): Promise<boolean> {
    return this.post(`${this.host}/users/logout`, session);
  }

  register(credentials: ICredentials): Promise<boolean> {
    return this.post(`${this.host}/users/register`, credentials);
  }
}
