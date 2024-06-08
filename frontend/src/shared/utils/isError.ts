import { IError } from "../model/IError";

export const isError = (value: any): value is IError => {
  return "message" in value && "createdAt" in value;
};
