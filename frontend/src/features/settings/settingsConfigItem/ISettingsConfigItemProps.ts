import { IUserConfig } from "../../../model/IUserConfig";

export interface ISettingsConfigItemProps {
  property: keyof IUserConfig;
  title: string;
}
