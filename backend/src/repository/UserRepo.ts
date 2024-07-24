import { IUser } from "../model/IUser";
import { Users } from "../model/Users";
import { ICredentials } from "../shared/model/ICredentials";
import { hash } from "../utils/hash";
import { hashPassword } from "../utils/hashPassword";
import { uuid } from "../utils/uuid";
import { Repository } from "./core/Repository";

export class UserRepo extends Repository<IUser> {
  constructor() {
    super(Users);
  }

  async createUser(credentials: ICredentials): Promise<IUser> {
    const salt = hash(uuid());
    const password = hashPassword(credentials.password, salt);

    const user = await this.add({
      password,
      salt,
      username: credentials.username,
    });
    return user;
  }

  async findByCredentials(
    credentials: ICredentials
  ): Promise<IUser | undefined> {
    const user = await this.findByUsername(credentials.username);
    if (!user) {
      return undefined;
    }

    const password = hashPassword(credentials.password, user.salt);
    if (password === user.password) {
      return user;
    }

    return undefined;
  }

  async findByUsername(username: string): Promise<IUser | undefined> {
    const user = await this.findFirst({ username });
    return user;
  }
}
