import { IUser } from "../model/IUser";
import { ICredentials } from "../shared/model/ICredentials";
import { hash } from "../utils/hash";
import { uuid } from "../utils/uuid";

class UserRepoDefault {
  private PEPPER =
    "c894eed9031e71867d76ca1784fadb0a87ca7cd4b83e2c5603a818d2616576f8";
  private users: IUser[] = [];

  createUser(credentials: ICredentials): IUser | undefined {
    const salt = hash(uuid());
    const password = this.hashPassword(credentials.password, salt);

    const user: IUser = {
      id: uuid(),
      username: credentials.username,
      password: password,
      salt,
    };
    this.users.push(user);
    return user;
  }

  findByCredentials(credentials: ICredentials): IUser | undefined {
    const user = this.findByUsername(credentials.username);
    if (!user) {
      return;
    }
    const password = this.hashPassword(credentials.password, user.salt);
    if (password === user.password) {
      return user;
    }
    return undefined;
  }

  findByUsername(username: string): IUser | undefined {
    return this.users.find((user) => user.username === username);
  }

  private hashPassword(password: string, salt: string): string {
    return hash(`${password}-${salt}-${this.PEPPER}`);
  }
}

export const UserRepo = new UserRepoDefault();
