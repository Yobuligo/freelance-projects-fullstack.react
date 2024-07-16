import { ISession } from "../shared/model/ISession";

class SessionRepoDefault {
  private sessions: ISession[] = [];

  createUserSession(username: string): ISession {
    this.deleteUserSession(username);
    const session: ISession = { username: username };
    this.sessions.push(session);
    return session;
  }

  deleteUserSession(username: string) {
    const index = this.sessions.findIndex(
      (session) => session.username === username
    );
    this.sessions.splice(index, 1);
  }
}

export const SessionRepo = new SessionRepoDefault();
