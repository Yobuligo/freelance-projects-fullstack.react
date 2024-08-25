import { Switch } from "../../../../components/switch/Switch";
import { useUserConfig } from "../../../../hooks/useUserConfig";
import { SettingsItem } from "../../../settings/settingsItem/SettingsItem";
import { IOpportunitySettingsConfigItemProps } from "./IOpportunitySettingsConfigItemProps";

export const OpportunitySettingsConfigItem: React.FC<IOpportunitySettingsConfigItemProps> = (
  props
) => {
  const [userConfig, setUserConfig] = useUserConfig();

  const onChecked = (checked: boolean) =>
    setUserConfig((previous) => {
      previous[props.property] = checked;
      return { ...previous };
    });

  return (
    <SettingsItem title={props.title}>
      <Switch checked={userConfig[props.property]} onChange={onChecked} />
    </SettingsItem>
  );
};
