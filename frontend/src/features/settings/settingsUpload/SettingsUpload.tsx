import { useState } from "react";
import { useConfirmIcon } from "../../../hooks/useConfirmIcon";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { UploadIcon } from "../../../icons/UploadIcon";
import { ISettingsUploadProps } from "./ISettingsUploadProps";
import styles from "./SettingsUpload.module.scss";

export const SettingsUpload: React.FC<ISettingsUploadProps> = (props) => {
  const { t } = useTranslation();
  const confirmUpload = useConfirmIcon();
  const [json, setJson] = useState("");

  const onChangeJson = (event: React.ChangeEvent<HTMLInputElement>) =>
    setJson(event.target.value);

  const onResetJson = () => setJson("");

  const onUpload = () => {
    confirmUpload.onConfirm();
    onResetJson();
  };

  return (
    <div className={styles.upload}>
      <input onChange={onChangeJson} type="text" value={json} />
      {!confirmUpload.isConfirming ? (
        <UploadIcon onClick={onUpload} />
      ) : (
        <>{confirmUpload.content(t(texts.settingsUpload.uploaded))}</>
      )}
    </div>
  );
};
