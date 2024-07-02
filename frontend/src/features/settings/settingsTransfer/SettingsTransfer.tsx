import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { SettingsDownload } from "../settingsDownload/SettingsDownload";
import { SettingsItem } from "../settingsItem/SettingsItem";
import { SettingsUpload } from "../settingsUpload/SettingsUpload";

export const SettingsTransfer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SettingsItem title={t(texts.settingsTransfer.downloadConfig)}>
        <SettingsDownload />
      </SettingsItem>
      <SettingsItem title={t(texts.settingsTransfer.uploadConfig)}>
        <SettingsUpload />
      </SettingsItem>
    </>
  );
};
