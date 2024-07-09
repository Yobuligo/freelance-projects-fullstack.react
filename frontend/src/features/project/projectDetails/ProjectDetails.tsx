import { Switch } from "../../../components/switch/Switch";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { IProjectDetailsProps } from "./IProjectDetailsProps";
import styles from "./ProjectDetails.module.scss";

export const ProjectDetails: React.FC<IProjectDetailsProps> = (props) => {
  const { t } = useTranslation();
  
  return (
    <div>
      <div className={styles.item}>
        {t(texts.projectDetails.applied)}
        <Switch checked={props.project.applied} />
      </div>
      <div className={styles.item}>
        {t(texts.projectDetails.applicationType)}
        <button>Portal</button>
        <button>E-Mail</button>
      </div>
      <div className={styles.item}>
        {t(texts.projectDetails.contact)}
        <input type="text" />
      </div>
    </div>
  );
};
