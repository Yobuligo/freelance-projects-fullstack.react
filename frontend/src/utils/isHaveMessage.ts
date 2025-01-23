import { IHaveMessage } from "../types/IHaveMessage";

export const isHaveMessage = (value: any): value is IHaveMessage => {
  if ("message" in value && typeof value.message === "string") {
    return true;
  }
  return false;
};
