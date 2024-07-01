import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { DownloadIcon } from "../../../icons/DownloadIcon";
import { UploadIcon } from "../../../icons/UploadIcon";
import { SettingsItem } from "../settingsItem/SettingsItem";

export const SettingsTransfer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SettingsItem title={t(texts.settingsTransfer.downloadConfig)}>
        <DownloadIcon />
      </SettingsItem>
      <SettingsItem title={t(texts.settingsTransfer.uploadConfig)}>
        <UploadIcon />
      </SettingsItem>
    </>
  );
};
