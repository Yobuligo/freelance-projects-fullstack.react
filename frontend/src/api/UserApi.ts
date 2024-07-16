import { ICredentials } from "../shared/model/ICredentials";
import { ISession } from "../shared/model/ISession";
import { RESTApi } from "./RESTApi";

class UserApiDefault extends RESTApi {
  login(credentials: ICredentials): Promise<ISession> {
    throw new Error("Not yet implemented");
  }

  register(credentials: ICredentials) {
    throw new Error("Not yet implemented");
  }
}

export const UserApi = new UserApiDefault();
