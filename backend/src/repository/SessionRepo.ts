import { IUser } from "../model/IUser";
import { Sessions } from "../model/Sessions";
import { ISession } from "../shared/model/ISession";
import { ParentRepository } from "./core/ParentRepository";

export class SessionRepo extends ParentRepository<ISession> {
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
    const count = await this.model.destroy({ where: { id: session.id } });
    return count === 1;
  }

  async deleteUserSession(userId: string) {
    await this.model.destroy({ where: { userId } });
  }
}
