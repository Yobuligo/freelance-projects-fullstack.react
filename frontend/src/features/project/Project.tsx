import { Card } from "../../components/Card";
import { renderDate } from "../../utils/renderDate";
import { IProjectProps } from "./IProjectProps";
import styles from "./Project.module.scss";

export const Project: React.FC<IProjectProps> = (props) => {
  return (
    <Card className={styles.project}>
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
    </Card>
  );
};
