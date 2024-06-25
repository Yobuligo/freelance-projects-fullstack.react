import { Switch } from "../../../components/switch/Switch";
import { useUserConfig } from "../../../hooks/useUserConfig";
import { SettingsItem } from "../settingsItem/SettingsItem";
import { ISettingsConfigItemProps } from "./ISettingsConfigItemProps";

export const SettingsConfigItem: React.FC<ISettingsConfigItemProps> = (
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
