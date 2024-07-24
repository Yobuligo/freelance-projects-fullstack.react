import { IUser } from "../model/IUser";
import { Sessions } from "../model/Sessions";
import { ISession } from "../shared/model/ISession";
import { Repository } from "./core/Repository";

export class SessionRepo extends Repository<ISession> {
  constructor() {
    super(Sessions);
  }

  async createUserSession(user: IUser): Promise<ISession> {
    await this.deleteUserSession(user.username);
    const session = await this.add({
      expiresAt: new Date(), // Todo - take a valid date
      userId: user.id,
      username: user.username,
    });

    return session;
  }

  async deleteSession(session: ISession): Promise<boolean> {
    return await this.deleteById(session.id);
  }

  async deleteUserSession(userId: string) {
    await this.model.destroy({ where: { userId } });
  }
}
