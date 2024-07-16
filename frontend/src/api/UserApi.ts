import { ICredentials } from "../shared/model/ICredentials";
import { ISession } from "../shared/model/ISession";
import { RESTApi } from "./RESTApi";

class UserApiDefault extends RESTApi {
  login(credentials: ICredentials): Promise<ISession> {
    return this.post(`${this.host}/users/login`, credentials);
  }

  register(credentials: ICredentials): Promise<boolean> {
    return this.post(`${this.host}/users/register`, credentials);
  }
}

export const UserApi = new UserApiDefault();
