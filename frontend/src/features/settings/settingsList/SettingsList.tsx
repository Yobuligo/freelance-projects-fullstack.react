import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { SettingsConfigItem } from "../settingsConfigItem/SettingsConfigItem";
import styles from "./SettingsList.module.scss";

export const SettingsList: React.FC = () => {
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
