import { DateTime } from "../core/date/DateTime";
import { IUser } from "../model/IUser";
import { Session } from "../model/sequelize/Session";
import { ISession } from "../shared/model/ISession";
import { Repository } from "./core/Repository";

export class SessionRepo extends Repository<ISession> {
  constructor() {
    super(Session);
  }

  async createUserSession(user: IUser, platform: string): Promise<ISession> {
    await this.deleteUserSession(user.id, platform);
    const session = await this.insert({
      expiresAt: new Date("2099-12-31"),
      platform: platform,
      userId: user.id,
      username: user.username,
    });

    return session;
  }

  async deleteSession(session: ISession): Promise<boolean> {
    return await this.deleteUserSession(session.userId, session.platform);
  }

  async deleteUserSession(userId: string, platform: string) {
    const count = await this.model.destroy({ where: { userId, platform } });
    return count > 0;
  }
}
