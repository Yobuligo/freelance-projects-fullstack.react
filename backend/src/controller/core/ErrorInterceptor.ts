import { NextFunction, Request, Response } from "express";
import { createError } from "../../shared/utils/createError";
import { isError } from "../../shared/utils/isError";

/**
 * This interceptor wraps the call of the *{@link requestHandler}* and throws an internal server error, if the call fails.
 */
export const ErrorInterceptor = (
  requestHandler: (req: Request, res: Response, next: NextFunction) => void
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      requestHandler(req, res, next);
    } catch (error) {
      if (isError(error)) {
        res.status(500).send(error);
      } else {
        res
          .status(500)
          .send(createError("Internal server error", "InternalServerError"));
      }
    }
  };
};
