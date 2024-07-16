import hash from "hash.js";
import { v4 as uuid } from "uuid";
import { IUser } from "../model/IUser";
import { ICredentials } from "../shared/model/ICredentials";

class UserRepoDefault {
  private users: IUser[] = [];

  createUser(credentials: ICredentials): IUser | undefined {
    const password = this.hashPassword(credentials.password);
    const pepper = this.hashPassword(uuid());
    console.log(pepper);

    const user: IUser = {
      id: uuid(),
      password: password,
      username: credentials.username,
    };
    this.users.push(user);
    return user;
  }

  findByCredentials(credentials: ICredentials): IUser | undefined {
    const password = this.hashPassword(credentials.password);
    return this.users.find(
      (user) =>
        user.username === credentials.username && user.password === password
    );
  }

  findByUsername(username: string): IUser | undefined {
    return this.users.find((user) => user.username === username);
  }

  private hashPassword(password: string): string {
    return hash.sha256().update(password).digest("hex");
  }
}

export const UserRepo = new UserRepoDefault();
