import { ISession } from "../shared/model/ISession";
import { uuid } from "../utils/uuid";

class SessionRepoDefault {
  private sessions: ISession[] = [];

  createUserSession(username: string): ISession {
    this.deleteUserSession(username);
    const session: ISession = { id: uuid(), username: username };
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

  deleteUserSession(username: string) {
    const index = this.sessions.findIndex(
      (session) => session.username === username
    );
    this.sessions.splice(index, 1);
  }
}

export const SessionRepo = new SessionRepoDefault();
