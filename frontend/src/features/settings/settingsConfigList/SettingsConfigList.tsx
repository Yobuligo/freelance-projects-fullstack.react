import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { SettingsConfigItem } from "../settingsConfigItem/SettingsConfigItem";
import styles from "./SettingsConfigList.module.scss";

export const SettingsConfigList: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.settingsList}>
      <SettingsConfigItem
        property="openLinkInline"
        title={t(texts.settingsSection.generalSettings.openLinkInline)}
      />
    </div>
  );
};
