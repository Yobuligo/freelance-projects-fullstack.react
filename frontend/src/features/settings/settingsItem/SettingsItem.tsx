import { Switch } from "../../../components/switch/Switch";
import { useUserConfig } from "../../../hooks/useUserConfig";
import { ISettingsItemProps } from "./ISettingsItemProps";
import styles from "./SettingsItem.module.scss";

export const SettingsItem: React.FC<ISettingsItemProps> = (props) => {
  const [userConfig, setUserConfig] = useUserConfig();

  const onChecked = (checked: boolean) =>
    setUserConfig((previous) => {
      previous[props.property] = checked;
      return { ...previous };
    });

  return (
    <div className={styles.settingsItem}>
      <div className={styles.title}>{props.title}</div>
      <Switch checked={userConfig[props.property]} onChange={onChecked} />
    </div>
  );
};
