import { ISettingsSectionProps } from "./ISettingsSectionProps";
import styles from "./SettingsSection.module.scss";

export const SettingsSection: React.FC<ISettingsSectionProps> = (props) => {
  return (
    <div>
      <h2 className={styles.title}>{props.title}</h2>
      <div className={styles.children}>{props.children}</div>
    </div>
  );
};
