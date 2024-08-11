import { DateTime } from "../core/date/DateTime";
import { IUser } from "../model/IUser";
import { Session } from "../model/sequelize/Session";
import { ISession } from "../shared/model/ISession";
import { Repository } from "./core/Repository";

export class SessionRepo extends Repository<ISession> {
  constructor() {
    super(Session);
  }

  async createUserSession(user: IUser): Promise<ISession> {
    await this.deleteUserSession(user.id);
    const session = await this.insert({
      expiresAt: DateTime.addHours(new Date(), 24),
      userId: user.id,
      username: user.username,
    });

    return session;
  }

  async deleteSession(session: ISession): Promise<boolean> {
    return await this.deleteUserSession(session.userId);
  }

  async deleteUserSession(userId: string) {
    const count = await this.model.destroy({ where: { userId } });
    return count > 0;
  }
}
