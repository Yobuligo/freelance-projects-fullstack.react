import { useState } from "react";
import { useSettings } from "../../../hooks/useSettings";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { useUserConfig } from "../../../hooks/useUserConfig";
import { CheckIcon } from "../../../icons/CheckIcon";
import { DownloadIcon } from "../../../icons/DownloadIcon";
import { UploadIcon } from "../../../icons/UploadIcon";
import { IDownload } from "../model/IDownload";
import { SettingsItem } from "../settingsItem/SettingsItem";
import styles from "./SettingsTransfer.module.scss";

export const SettingsTransfer: React.FC = () => {
  const { t } = useTranslation();
  const [userConfig] = useUserConfig();
  const [settings] = useSettings();
  const [isDownloading, setIsDownloading] = useState(false);

  const onDownload = () => {
    setIsDownloading(true);
    const download: IDownload = {
      settings,
      userConfig,
    };
    navigator.clipboard.writeText(JSON.stringify(download));
    setTimeout(() => setIsDownloading(false), 5000);
  };

  return (
    <>
      <SettingsItem title={t(texts.settingsTransfer.downloadConfig)}>
        {!isDownloading ? (
          <DownloadIcon onClick={onDownload} />
        ) : (
          <div className={styles.copied}>
            <CheckIcon />
            Copied
          </div>
        )}
      </SettingsItem>
      <SettingsItem title={t(texts.settingsTransfer.uploadConfig)}>
        <UploadIcon />
      </SettingsItem>
    </>
  );
};
