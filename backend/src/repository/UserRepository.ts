import { IUser } from "../model/IUser";
import { Users } from "../model/Users";
import { ParentRepository } from "./core/ParentRepository";

export class UserRepository extends ParentRepository<IUser> {
  constructor() {
    super(Users);
  }
}
