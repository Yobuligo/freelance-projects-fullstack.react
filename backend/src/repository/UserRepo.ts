import { IUser } from "../model/IUser";
import { ICredentials } from "../shared/model/ICredentials";
import { hash } from "../utils/hash";
import { hashPassword } from "../utils/hashPassword";
import { uuid } from "../utils/uuid";

class UserRepoDefault {
  private users: IUser[] = [];

  createUser(credentials: ICredentials): IUser {
    const salt = hash(uuid());
    const password = hashPassword(credentials.password, salt);

    const user: IUser = {
      id: uuid(),
      username: credentials.username,
      password: password,
      salt,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  findByCredentials(credentials: ICredentials): IUser | undefined {
    const user = this.findByUsername(credentials.username);
    if (!user) {
      return;
    }
    const password = hashPassword(credentials.password, user.salt);
    if (password === user.password) {
      return user;
    }
    return undefined;
  }

  findByUsername(username: string): IUser | undefined {
    return this.users.find((user) => user.username === username);
  }
}

export const UserRepo = new UserRepoDefault();
