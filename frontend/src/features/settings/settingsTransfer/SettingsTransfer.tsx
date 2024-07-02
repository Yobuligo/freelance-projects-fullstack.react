import { useSettings } from "../../../hooks/useSettings";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { useUserConfig } from "../../../hooks/useUserConfig";
import { DownloadIcon } from "../../../icons/DownloadIcon";
import { UploadIcon } from "../../../icons/UploadIcon";
import { IDownload } from "../model/IDownload";
import { SettingsItem } from "../settingsItem/SettingsItem";

export const SettingsTransfer: React.FC = () => {
  const { t } = useTranslation();
  const [userConfig] = useUserConfig();
  const [settings] = useSettings();

  const onDownload = () => {
    const download: IDownload = {
      settings,
      userConfig,
    };
    navigator.clipboard.writeText(JSON.stringify(download));
  };

  return (
    <>
      <SettingsItem title={t(texts.settingsTransfer.downloadConfig)}>
        <DownloadIcon onClick={onDownload} />
      </SettingsItem>
      <SettingsItem title={t(texts.settingsTransfer.uploadConfig)}>
        <UploadIcon />
      </SettingsItem>
    </>
  );
};
