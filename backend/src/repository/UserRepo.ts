import { IUser } from "../model/IUser";
import { ICredentials } from "../shared/model/ICredentials";
import { v4 as uuid } from "uuid";

class UserRepoDefault {
  private users: IUser[] = [];

  createUser(credentials: ICredentials): IUser | undefined {
    const user: IUser = {
      id: uuid(),
      password: credentials.password,
      username: credentials.username,
    };
    this.users.push(user);
    return user;
  }

  findByCredentials(credentials: ICredentials): IUser | undefined {
    return this.users.find(
      (user) =>
        user.username === credentials.username &&
        user.password === credentials.password
    );
  }

  findByUsername(username: string): IUser | undefined {
    return this.users.find((user) => user.username === username);
  }
}

export const UserRepo = new UserRepoDefault();
