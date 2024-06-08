import { IError } from "../model/IError";

export const createError = (message: string): IError => {
  return { createdAt: new Date(), message };
};
