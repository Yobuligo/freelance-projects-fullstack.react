import { IUserConfig } from "../../../../model/IUserConfig";

export interface IOpportunitySettingsConfigItemProps {
  property: keyof IUserConfig;
  title: string;
}
