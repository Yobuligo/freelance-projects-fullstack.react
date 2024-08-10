import { IError } from "../model/IError";

export const createError = (message: string, type?: string): IError => {
  return { createdAt: new Date(), message, type };
};
