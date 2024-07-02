import { useConfirmIcon } from "../../../hooks/useConfirmIcon";
import { useSettings } from "../../../hooks/useSettings";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { useUserConfig } from "../../../hooks/useUserConfig";
import { DownloadIcon } from "../../../icons/DownloadIcon";
import { IDownload } from "../model/IDownload";
import { SettingsItem } from "../settingsItem/SettingsItem";
import { SettingsUpload } from "../settingsUpload/SettingsUpload";

export const SettingsTransfer: React.FC = () => {
  const { t } = useTranslation();
  const [userConfig] = useUserConfig();
  const [settings] = useSettings();
  const confirmDownload = useConfirmIcon();

  const onDownload = () => {
    confirmDownload.triggerConfirm();
    const download: IDownload = {
      settings,
      userConfig,
    };
    navigator.clipboard.writeText(JSON.stringify(download));
  };

  return (
    <>
      <SettingsItem title={t(texts.settingsTransfer.downloadConfig)}>
        {!confirmDownload.isConfirming ? (
          <DownloadIcon onClick={onDownload} />
        ) : (
          <>
            {confirmDownload.content(
              t(texts.settingsTransfer.copiedToClipboard)
            )}
          </>
        )}
      </SettingsItem>
      <SettingsItem title={t(texts.settingsTransfer.uploadConfig)}>
        <SettingsUpload />
      </SettingsItem>
    </>
  );
};
