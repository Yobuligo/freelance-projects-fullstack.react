import { useConfirmIcon } from "../../../hooks/useConfirmIcon";
import { useSettings } from "../../../hooks/useSettings";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { useUserConfig } from "../../../hooks/useUserConfig";
import { DownloadIcon } from "../../../icons/DownloadIcon";
import { UploadIcon } from "../../../icons/UploadIcon";
import { IDownload } from "../model/IDownload";
import { SettingsItem } from "../settingsItem/SettingsItem";
import styles from "./SettingsTransfer.module.scss";

export const SettingsTransfer: React.FC = () => {
  const { t } = useTranslation();
  const [userConfig] = useUserConfig();
  const [settings] = useSettings();
  const confirmDownload = useConfirmIcon();
  const confirmUpload = useConfirmIcon();

  const onDownload = () => {
    confirmDownload.onConfirm();
    const download: IDownload = {
      settings,
      userConfig,
    };
    navigator.clipboard.writeText(JSON.stringify(download));
  };

  const onUpload = () => {
    confirmUpload.onConfirm();
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
        <div className={styles.upload}>
          <input type="text" />
          {!confirmUpload.isConfirming ? (
            <UploadIcon onClick={onUpload} />
          ) : (
            <>{confirmUpload.content(t(texts.settingsTransfer.uploaded))}</>
          )}
        </div>
      </SettingsItem>
    </>
  );
};
