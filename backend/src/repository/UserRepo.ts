import { IUser } from "../model/IUser";
import { ICredentials } from "../shared/model/ICredentials";

class UserRepoDefault {
  private users: IUser[] = [];

  findByCredentials(credentials: ICredentials): IUser | undefined {
    return this.users.find(
      (user) =>
        user.username === credentials.username &&
        user.password === credentials.password
    );
  }
}

export const UserRepo = new UserRepoDefault();
