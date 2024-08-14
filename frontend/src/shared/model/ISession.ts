import { IEntity } from "../types/IEntity";

export interface ISession extends IEntity {
  expiresAt: Date;
  platform: string;
  userId: string;
  username: string;
}
