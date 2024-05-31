import { useState } from "react";
import { ReactComponent as CheckedIcon } from "../../../assets/checked.svg";
import { ReactComponent as UncheckedIcon } from "../../../assets/unchecked.svg";
import { Card } from "../../../components/card/Card";
import { renderDate } from "../../../shared/utils/renderDate";
import { IProjectItemProps } from "./IProjectItemProps";
import styles from "./ProjectItem.module.scss";

export const ProjectItem: React.FC<IProjectItemProps> = (props) => {
  const [checked, setChecked] = useState(props.project.completed);

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

  return (
    <Card className={styles.projectItem}>
      <div className={styles.projectItemIcon}>
        {checked ? (
          <CheckedIcon className={styles.icon} onClick={onToggleChecked} />
        ) : (
          <UncheckedIcon className={styles.icon} onClick={onToggleChecked} />
        )}
      </div>
      <div className={styles.projectItemDetails}>
        <div className={styles.company}>
          {props.project.company.length > 0
            ? props.project.company
            : "Company not provided"}
        </div>
        <a href={props.project.url}>
          <h3 className={styles.title}>{props.project.title}</h3>
        </a>
        <div className={styles.location}>{props.project.location}</div>
        <div>{renderDate(props.project.createdAt)}</div>
      </div>
    </Card>
  );
};
