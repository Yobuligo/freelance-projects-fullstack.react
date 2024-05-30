import { Card } from "../../components/card/Card";
import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { IReloadButtonProps } from "./IReloadButtonProps";
import styles from "./ReloadButton.module.scss";

export const ReloadButton: React.FC<IReloadButtonProps> = (props) => {
  const { t } = useTranslation();

  return (
    <Card className={styles.reloadButton}>
      <div onClick={props.onClick}>{t(texts.reloadButton.caption)}</div>
    </Card>
  );
};
