import { ITitledSectionProps } from "./ITitledSectionProps";
import styles from "./TitledSection.module.scss";

export const TitledSection: React.FC<ITitledSectionProps> = (props) => {
  return (
    <div className={props.className}>
      <h3 className={styles.title}>{props.title}</h3>
      {props.children}
    </div>
  );
};
