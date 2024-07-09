import { Switch } from "../../../components/switch/Switch";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { ApplicationType } from "../../../shared/types/ApplicationType";
import { IProjectDetailsProps } from "./IProjectDetailsProps";
import styles from "./ProjectDetails.module.scss";

export const ProjectDetails: React.FC<IProjectDetailsProps> = (props) => {
  const { t } = useTranslation();

  const triggerChange = () => props.onChange?.(props.project);

  const onApplyChanged = (checked: boolean) => {
    props.project.applied = checked;
    triggerChange();
  };

  const onSelectPortal = () => {
    props.project.applicationType = ApplicationType.Portal;
    triggerChange();
  };

  const onSelectEmail = () => {
    props.project.applicationType = ApplicationType.Email;
    triggerChange();
  };

  const onContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.project.contact = event.target.value;
    triggerChange();
  };

  return (
    <div>
      <div className={styles.item}>
        {t(texts.projectDetails.applied)}
        <Switch checked={props.project.applied} onChange={onApplyChanged} />
      </div>
      <div className={styles.item}>
        {t(texts.projectDetails.applicationType)}
        <button onClick={onSelectPortal}>
          {t(texts.projectDetails.portal)}
        </button>
        <button onClick={onSelectEmail}>{t(texts.projectDetails.email)}</button>
      </div>
      <div className={styles.item}>
        {t(texts.projectDetails.contact)}
        <input
          type="text"
          value={props.project.contact}
          onChange={onContactChange}
        />
      </div>
    </div>
  );
};
