import { Switch } from "../../../components/switch/Switch";
import { TextArea } from "../../../components/textarea/TextArea";
import { ToggleButtonGroup } from "../../../components/toggleButtonGroup/ToggleButtonGroup";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { formatDate } from "../../../utils/formatDate";
import { IOpportunityDetailsProps } from "./IOpportunityDetailsProps";
import styles from "./OpportunityDetails.module.scss";
import { useOpportunityDetailsViewModel } from "./useOpportunityDetailsViewModel";

export const OpportunityDetails: React.FC<IOpportunityDetailsProps> = (
  props
) => {
  const { t } = useTranslation();
  const viewModel = useOpportunityDetailsViewModel(props);

  return (
    <div className={styles.opportunityDetails}>
      <TextArea
        label={t(texts.note.title)}
        value={viewModel.text}
        onChange={viewModel.onNoteTextChange}
      />
      <div>
        <div className={styles.item}>
          <div className={styles.title}>
            {t(texts.opportunityDetails.applied)}
          </div>
          <Switch
            checked={props.userOpportunity.applied}
            onChange={viewModel.onApplyChanged}
          />
          <>
            {props.userOpportunity.appliedAt &&
              formatDate(props.userOpportunity.appliedAt)}
          </>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>
            {t(texts.opportunityDetails.rejected)}
          </div>
          <Switch
            checked={props.userOpportunity.rejected}
            onChange={viewModel.onRejectChanged}
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
            items={viewModel.applicationTypeItems}
            onSelect={viewModel.onApplicationTypeSelected}
            selected={viewModel.findSelected()}
          />
        </div>
        <div className={styles.item}>
          <div className={styles.title}>
            {t(texts.opportunityDetails.contact)}
          </div>
          <input
            className={styles.contact}
            value={props.userOpportunity.contact ?? ""}
            onChange={viewModel.onContactChange}
            type="text"
          />
        </div>
      </div>
    </div>
  );
};
