import { useMemo } from "react";
import { Switch } from "../../../components/switch/Switch";
import { ToggleButtonGroup } from "../../../components/toggleButtonGroup/ToggleButtonGroup";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { ApplicationType } from "../../../shared/types/ApplicationType";
import { formatDate } from "../../../utils/formatDate";
import { IApplicationTypeOption } from "./IApplicationTypeOption";
import { IOpportunityDetailsProps } from "./IOpportunityDetailsProps";
import styles from "./OpportunityDetails.module.scss";

export const OpportunityDetails: React.FC<IOpportunityDetailsProps> = (props) => {
  const { t } = useTranslation();

  const triggerChange = () => props.onChange?.(props.userOpportunity);

  const onApplyChanged = (checked: boolean) => {
    props.userOpportunity.applied = checked;
    if (checked === true) {
      props.userOpportunity.appliedAt = new Date().toISOString() as unknown as Date;
    } else {
      props.userOpportunity.appliedAt = undefined;
    }

    if (checked === true && props.userOpportunity.applicationType === undefined) {
      props.userOpportunity.applicationType = ApplicationType.Portal;
    }
    triggerChange();
  };

  /**
   * Switch to reject was changed
   */
  const onRejectChanged = (checked: boolean) => {
    props.userOpportunity.rejected = checked;
    if (checked === true) {
      props.userOpportunity.rejectedAt =
        new Date().toISOString() as unknown as Date;
    } else {
      props.userOpportunity.rejectedAt = undefined;
    }
    triggerChange();
  };

  const onSelectPortal = () => {
    props.userOpportunity.applicationType = ApplicationType.Portal;
    triggerChange();
  };

  const onSelectEmail = () => {
    props.userOpportunity.applicationType = ApplicationType.Email;
    triggerChange();
  };

  const onContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.userOpportunity.contact = event.target.value;
    triggerChange();
  };

  const applicationTypeItems: IApplicationTypeOption[] = useMemo(
    () => [
      {
        type: ApplicationType.Portal,
        title: t(texts.opportunityDetails.portal),
      },
      {
        type: ApplicationType.Email,
        title: t(texts.opportunityDetails.email),
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
        applicationTypeOption.type === props.userOpportunity.applicationType
    );
  };

  return (
    <div className={styles.opportunityDetails}>
      <div className={styles.item}>
        <div className={styles.title}>{t(texts.opportunityDetails.applied)}</div>
        <Switch checked={props.userOpportunity.applied} onChange={onApplyChanged} />
        <>
          {props.userOpportunity.appliedAt &&
            formatDate(props.userOpportunity.appliedAt)}
        </>
      </div>
      <div className={styles.item}>
        <div className={styles.title}>{t(texts.opportunityDetails.rejected)}</div>
        <Switch
          checked={props.userOpportunity.rejected}
          onChange={onRejectChanged}
        />
        <>
          {props.userOpportunity.rejectedAt &&
            formatDate(props.userOpportunity.rejectedAt)}
        </>
      </div>
      <div className={styles.item}>
        <div className={styles.title}>
          {t(texts.opportunityDetails.applicationType)}
        </div>
        <ToggleButtonGroup
          items={applicationTypeItems}
          onSelect={onApplicationTypeSelected}
          selected={findSelected()}
        />
      </div>
      <div className={styles.item}>
        <div className={styles.title}>{t(texts.opportunityDetails.contact)}</div>
        <input
          className={styles.contact}
          type="text"
          value={props.userOpportunity.contact}
          onChange={onContactChange}
        />
      </div>
    </div>
  );
};
