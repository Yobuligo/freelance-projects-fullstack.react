import { AppConfig } from "../AppConfig";
import { hash } from "./hash";

export const hashPassword = (password: string, salt: string): string => {
  return hash(`${password}-${salt}-${AppConfig.PEPPER}`);
};
