import { NextFunction, Request, Response } from "express";
import { DateTime } from "../../core/date/DateTime";
import { SessionRepo } from "../../repository/SessionRepo";
import { createError } from "../../shared/utils/createError";
import { ISessionRequest } from "./types/ISessionRequest";

export const SessionInterceptor = (
  requestHandler: (
    req: ISessionRequest,
    res: Response,
    next: NextFunction
  ) => void
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = req.query.token?.toString();
    if (!sessionId) {
      return res
        .status(401)
        .send(createError("No session found", "NoSessionError"));
    }

    const sessionRepo = new SessionRepo();
    const session = await sessionRepo.findById(sessionId);
    if (!session) {
      return res
        .status(401)
        .send(createError("Invalid session", "InvalidSessionError"));
    }

    if (DateTime.isBefore(session.expiresAt)) {
      return res
        .status(401)
        .send(createError("Session expired", "ExpiredSessionError"));
    }

    const sessionRequest = req as ISessionRequest;
    sessionRequest.session = session;
    requestHandler(sessionRequest, res, next);
  };
};
