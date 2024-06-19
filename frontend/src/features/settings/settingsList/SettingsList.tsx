import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { SettingsItem } from "../settingsItem/SettingsItem";
import styles from "./SettingsList.module.scss";

export const SettingsList: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.settingsList}>
      <SettingsItem
        property="openLinkInline"
        title={t(texts.settingsSection.generalSettings.openLinkInline)}
      />
    </div>
  );
};
