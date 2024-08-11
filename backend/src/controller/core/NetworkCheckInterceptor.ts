import { NextFunction, Request, Response } from "express";
import { NetworkInfo } from "../../shared/services/NetworkInfo";
import { createError } from "../../shared/utils/createError";

export const NetworkCheckInterceptor = () => {
  return async (_req: Request, res: Response, next: NextFunction) => {
    if (!(await NetworkInfo.isConnected())) {
      return res.status(502).send(createError("Missing internet connection"));
    }
    next();
  };
};
