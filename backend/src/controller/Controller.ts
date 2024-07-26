import { Request, Response } from "express";
import { SessionRepo } from "../repository/SessionRepo";
import { ISession } from "../shared/model/ISession";
import { createError } from "../shared/utils/createError";

export abstract class Controller {
  protected async getSessionOrNull(
    req: Request
  ): Promise<ISession | undefined> {
    const token = req.query.token;
    if (!token) {
      return;
    }

    const sessionRepo = new SessionRepo();
    return await sessionRepo.findById(token.toString());
  }

  /**
   * Handles the request while using the user session.
   * The user session will be loaded. If the result is null a response with http state 401 is send to the client.
   * If the session was loaded, the handed over {@link handler} is called.
   */
  protected async handleSessionRequest(
    req: Request,
    res: Response,
    handler: (session: ISession) => void
  ) {
    const session = await this.getSessionOrNull(req);
    if (!session) {
      return res.status(401).send(createError("Invalid user session"));
    }
    handler(session);
  }
}
