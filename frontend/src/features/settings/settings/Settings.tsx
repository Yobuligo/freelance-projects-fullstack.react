import { ReactComponent as SettingsIcon } from "../../../assets/settings.svg";
import { Card } from "../../../components/card/Card";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { ISettingsProps } from "./ISettingsProps";
import styles from "./Settings.module.scss";

export const Settings: React.FC<ISettingsProps> = (props) => {
  const { t } = useTranslation();

  return (
    <Card className={styles.settings}>
      <div className={styles.title}>
        <SettingsIcon className={styles.icon} />
        <h1>{t(texts.general.settings)}</h1>
      </div>
      <div className={styles.settingsContent}>{props.children}</div>
    </Card>
  );
};
