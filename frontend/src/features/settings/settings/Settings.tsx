import { ReactComponent as SettingsIcon } from "../../../assets/settings.svg";
import { Card } from "../../../components/card/Card";
import { ISettingsProps } from "./ISettingsProps";
import styles from "./Settings.module.scss";

export const Settings: React.FC<ISettingsProps> = (props) => {
  return (
    <Card className={styles.settings}>
      <div className={styles.title}>
        <SettingsIcon className={styles.icon} />
        <h1>{props.title}</h1>
      </div>
      <div className={styles.settingsContent}>
        {props.children}
      </div>
    </Card>
  );
};
