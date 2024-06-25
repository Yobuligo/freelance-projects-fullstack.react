import { ISettingsItemProps } from "./ISettingsItemProps";
import styles from "./SettingsItem.module.scss";

/**
 * Any kind of option or parameter with a title for settings
 */
export const SettingsItem: React.FC<ISettingsItemProps> = (props) => {
  return (
    <div className={styles.settingsItem}>
      <div className={styles.title}>{props.title}</div>
      {props.children}
    </div>
  );
};
