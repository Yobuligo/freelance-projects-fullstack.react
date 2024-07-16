import hashing from "hash.js";

export const hash = (value: string): string => {
  return hashing.sha256().update(value).digest("hex");
};
