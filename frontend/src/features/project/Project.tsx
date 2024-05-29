import { useState } from "react";
import { ReactComponent as CheckedIcon } from "../../assets/checked.svg";
import { ReactComponent as UncheckedIcon } from "../../assets/unchecked.svg";
import { Card } from "../../components/Card";
import { renderDate } from "../../utils/renderDate";
import { IProjectProps } from "./IProjectProps";
import styles from "./Project.module.scss";

export const Project: React.FC<IProjectProps> = (props) => {
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
    <Card className={styles.project}>
      <div className={styles.projectIcon}>
        {checked ? (
          <CheckedIcon onClick={onToggleChecked} />
        ) : (
          <UncheckedIcon onClick={onToggleChecked} />
        )}
      </div>
      <div className={styles.projectDetails}>
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
