import { IEntity } from "../types/IEntity";

export interface ISession extends IEntity {
  userId: string;
  username: string;
}
