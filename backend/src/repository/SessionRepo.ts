import { IUser } from "../model/IUser";
import { Session } from "../model/sequelize/Session";
import { ISession } from "../shared/model/ISession";
import { Repository } from "./core/Repository";

export class SessionRepo extends Repository<ISession> {
  constructor() {
    super(Session);
  }

  async createUserSession(user: IUser): Promise<ISession> {
    await this.deleteUserSession(user.username);
    const session = await this.insert({
      expiresAt: new Date(), // Todo - take a valid date
      userId: user.id,
      username: user.username,
    });

    return session;
  }

  async validate(id: string) {
    const session = await this.model.findByPk(id);
    if (!session) {
      throw new Error(`Invalid session`);
    }

    // todo - check if session is expired
  }

  async deleteSession(session: ISession): Promise<boolean> {
    return await this.deleteById(session.id);
  }

  async deleteUserSession(userId: string) {
    await this.model.destroy({ where: { userId } });
  }
}
