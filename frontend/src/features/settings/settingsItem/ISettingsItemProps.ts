import { IUserConfig } from "../../../model/IUserConfig";

export interface ISettingsItemProps {
  property: keyof IUserConfig;
  title: string;
}
