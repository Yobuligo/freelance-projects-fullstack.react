import { useState } from "react";
import { Card } from "../../../components/card/Card";
import { Collapse } from "../../../components/collapse/Collapse";
import { useProviderDetails } from "../../../hooks/useProviderDetails";
import { CheckedIcon } from "../../../icons/CheckedIcon";
import { UncheckedIcon } from "../../../icons/UncheckedIcon";
import { renderDate } from "../../../shared/utils/renderDate";
import { style } from "../../../utils/style";
import { ProjectDetails } from "../projectDetails/ProjectDetails";
import { IProjectItemProps } from "./IProjectItemProps";
import styles from "./ProjectItem.module.scss";

export const ProjectItem: React.FC<IProjectItemProps> = (props) => {
  const [checked, setChecked] = useState(props.project.completed);
  const [displayDetails, setDisplayDetails] = useState(false);
  const providerDetails = useProviderDetails();

  const onToggleChecked = () =>
    setChecked((previous) => {
      previous = !previous;
      if (previous === true) {
        props.onChecked?.(props.project);
      } else {
        props.onUnchecked?.(props.project);
      }
      return previous;
    });

  const onSelect = () => props.onSelect?.(props.project);

  return (
    <Card
      className={style(
        styles.projectItem,
        props.isSelected ? styles.projectItemSelected : "",
        props.className
      )}
    >
      <div className={styles.projectItemIcon}>
        {checked ? (
          <CheckedIcon onClick={onToggleChecked} />
        ) : (
          <UncheckedIcon onClick={onToggleChecked} />
        )}
      </div>
      <div className={styles.projectItemDetails} onClick={onSelect}>
        <div>{providerDetails.findByType(props.project.provider)}</div>
        <div className={styles.company}>
          {props.project.company.length > 0
            ? props.project.company
            : "Company not provided"}
        </div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={props.project.url}
          className={styles.titleLink}
        >
          <h3 className={styles.title}>{props.project.title}</h3>
        </a>
        <div className={styles.location}>{props.project.location}</div>
        <div>{renderDate(props.project.publishedAt)}</div>
      </div>
      <div className={styles.projectDetails}>
        {displayDetails && (
          <ProjectDetails project={props.project} onChange={props.onChange} />
        )}
        <Collapse collapsed={displayDetails} setCollapsed={setDisplayDetails} />
      </div>
    </Card>
  );
};
