import { useState } from "react";
import { Card } from "../../../components/card/Card";
import { Collapse } from "../../../components/collapse/Collapse";
import { useProviderDetails } from "../../../hooks/useProviderDetails";
import { CheckedIcon } from "../../../icons/CheckedIcon";
import { UncheckedIcon } from "../../../icons/UncheckedIcon";
import { renderDate } from "../../../shared/utils/renderDate";
import { style } from "../../../utils/style";
import { OpportunityDetails } from "../opportunityDetails/OpportunityDetails";
import { IOpportunityItemProps } from "./IOpportunityItemProps";
import styles from "./OpportunityItem.module.scss";

export const OpportunityItem: React.FC<IOpportunityItemProps> = (props) => {
  const [checked, setChecked] = useState(props.userOpportunity.completed);
  const [displayDetails, setDisplayDetails] = useState(false);
  const providerDetails = useProviderDetails();

  const onToggleChecked = () =>
    setChecked((previous) => {
      previous = !previous;
      if (previous === true) {
        props.onChecked?.(props.userOpportunity);
      } else {
        props.onUnchecked?.(props.userOpportunity);
      }
      return previous;
    });

  const onSelect = () => props.onSelect?.(props.userOpportunity);

  return (
    <Card
      className={style(
        styles.opportunityItem,
        props.isSelected ? styles.opportunityItemSelected : "",
        props.className
      )}
    >
      <div className={styles.opportunityItemIcon}>
        {checked ? (
          <CheckedIcon onClick={onToggleChecked} />
        ) : (
          <UncheckedIcon onClick={onToggleChecked} />
        )}
      </div>
      <div className={styles.opportunityItemDetails} onClick={onSelect}>
        <div>
          {providerDetails.findByType(props.userOpportunity.opportunity.provider)}
        </div>
        <div className={styles.company}>
          {props.userOpportunity.opportunity.company.length > 0
            ? props.userOpportunity.opportunity.company
            : "Company not provided"}
        </div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={props.userOpportunity.opportunity.url}
          className={styles.titleLink}
        >
          <h3 className={styles.title}>{props.userOpportunity.opportunity.title}</h3>
        </a>
        <div className={styles.location}>
          {props.userOpportunity.opportunity.location}
        </div>
        <div>{renderDate(props.userOpportunity.opportunity.publishedAt)}</div>
      </div>
      <div className={styles.opportunityDetails}>
        {displayDetails && (
          <OpportunityDetails
            userOpportunity={props.userOpportunity}
            onChange={props.onChange}
          />
        )}
        <Collapse collapsed={displayDetails} setCollapsed={setDisplayDetails} />
      </div>
    </Card>
  );
};
