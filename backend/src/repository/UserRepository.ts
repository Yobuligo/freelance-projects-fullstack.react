import { IUser } from "../model/IUser";
import { Users } from "../model/Users";
import { ParentRepository } from "./core/ParentRepository";

class UserRepositoryDefault extends ParentRepository<IUser> {
  constructor() {
    super(Users);
  }
}

export const UserRepository = new UserRepositoryDefault();
