import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { ReactComponent as WebsiteIcon } from "../../assets/pen.svg";
import { IconButton } from "../../components/buttons/iconButton/IconButton";
import { IconType } from "../../components/buttons/iconButton/IconType";
import styles from "./Header.module.scss";
import { IHeaderProps } from "./IHeaderProps";

export const Header: React.FC<IHeaderProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <WebsiteIcon className={styles.websiteIcon} />
        <div className={styles.headerTitle}>
          {t(texts.applyMessageGenerator.appTitle)}
        </div>
      </div>
      <div className={styles.headerRight}>
        <IconButton
          iconType={IconType.SETTINGS}
          onClick={props.onToggleSettings}
          isSelected={!props.settingsShown}
        />
      </div>
    </div>
  );
};
