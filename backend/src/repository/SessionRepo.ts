import { IUser } from "../model/IUser";
import { ISession } from "../shared/model/ISession";
import { uuid } from "../utils/uuid";

class SessionRepoDefault {
  private sessions: ISession[] = [];

  createUserSession(user: IUser): ISession {
    this.deleteUserSession(user.username);
    const session: ISession = {
      id: uuid(),
      userId: user.id,
      username: user.username,
      createdAt: new Date(),
    };
    this.sessions.push(session);
    return session;
  }

  deleteSession(session: ISession): boolean {
    const index = this.sessions.findIndex((item) => item.id === session.id);
    if (index !== -1) {
      this.sessions.splice(index, 1);
      return true;
    } else return false;
  }

  deleteUserSession(userId: string) {
    const index = this.sessions.findIndex(
      (session) => session.userId === userId
    );
    this.sessions.splice(index, 1);
  }
}

export const SessionRepo = new SessionRepoDefault();
