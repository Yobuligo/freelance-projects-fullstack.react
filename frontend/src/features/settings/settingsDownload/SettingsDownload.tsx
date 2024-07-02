import { useConfirmIcon } from "../../../hooks/useConfirmIcon";
import { useSettings } from "../../../hooks/useSettings";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { useUserConfig } from "../../../hooks/useUserConfig";
import { DownloadIcon } from "../../../icons/DownloadIcon";
import { IDownload } from "../model/IDownload";

export const SettingsDownload: React.FC = () => {
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
      {!confirmDownload.isConfirming ? (
        <DownloadIcon onClick={onDownload} />
      ) : (
        <>
          {confirmDownload.content(t(texts.settingsTransfer.copiedToClipboard))}
        </>
      )}
    </>
  );
};
