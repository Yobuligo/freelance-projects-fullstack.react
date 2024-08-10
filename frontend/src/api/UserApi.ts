import { ICredentials } from "../shared/model/ICredentials";
import { ISession } from "../shared/model/ISession";
import { UserRouteMeta } from "../shared/model/UserMeta";
import { Repository } from "./core/Repository";

export class UserApi extends Repository<any> {
  constructor() {
    super(UserRouteMeta);
  }

  login(credentials: ICredentials): Promise<ISession> {
    return this.post(`${this.url}/login`, credentials);
  }

  logout(session: ISession): Promise<boolean> {
    return this.post(`${this.url}/logout`, session);
  }

  register(credentials: ICredentials): Promise<boolean> {
    return this.post(`${this.url}/register`, credentials);
  }
}
