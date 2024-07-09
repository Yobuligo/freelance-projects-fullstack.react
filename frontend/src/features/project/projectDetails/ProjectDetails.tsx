import { useMemo } from "react";
import { Switch } from "../../../components/switch/Switch";
import { ToggleButtonGroup } from "../../../components/toggleButtonGroup/ToggleButtonGroup";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { ApplicationType } from "../../../shared/types/ApplicationType";
import { IApplicationTypeOption } from "./IApplicationTypeOption";
import { IProjectDetailsProps } from "./IProjectDetailsProps";
import styles from "./ProjectDetails.module.scss";

export const ProjectDetails: React.FC<IProjectDetailsProps> = (props) => {
  const { t } = useTranslation();

  const triggerChange = () => props.onChange?.(props.project);

  const onApplyChanged = (checked: boolean) => {
    props.project.applied = checked;
    if (checked === true && props.project.applicationType === undefined) {
      props.project.applicationType = ApplicationType.Portal;
    }
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

  const applicationTypeItems: IApplicationTypeOption[] = useMemo(
    () => [
      {
        type: ApplicationType.Portal,
        title: t(texts.projectDetails.portal),
      },
      {
        type: ApplicationType.Email,
        title: t(texts.projectDetails.email),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onApplicationTypeSelected = (
    selected: IApplicationTypeOption
  ): void => {
    if (selected.type === ApplicationType.Email) {
      onSelectEmail();
    } else {
      onSelectPortal();
    }
  };

  const findSelected = (): IApplicationTypeOption | undefined => {
    return applicationTypeItems.find(
      (applicationTypeOption) =>
        applicationTypeOption.type === props.project.applicationType
    );
  };

  return (
    <div className={styles.projectDetails}>
      <div className={styles.item}>
        <div className={styles.title}>{t(texts.projectDetails.applied)}</div>
        <Switch checked={props.project.applied} onChange={onApplyChanged} />
      </div>
      <div className={styles.item}>
        <div className={styles.title}>
          {t(texts.projectDetails.applicationType)}
        </div>
        <ToggleButtonGroup
          items={applicationTypeItems}
          onSelect={onApplicationTypeSelected}
          selected={findSelected()}
        />
      </div>
      <div className={styles.item}>
        <div className={styles.title}>{t(texts.projectDetails.contact)}</div>
        <input
          className={styles.contact}
          type="text"
          value={props.project.contact}
          onChange={onContactChange}
        />
      </div>
    </div>
  );
};
