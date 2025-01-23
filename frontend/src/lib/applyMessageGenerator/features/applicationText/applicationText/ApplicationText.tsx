import { IApplicationTextProps } from "./IApplicationTextProps";
import styles from "./ApplicationText.module.css";

export const ApplicationText: React.FC<IApplicationTextProps> = (props) => {
  return (
    <div className={styles.applicationText}>
      <p>{props.applicationText.type}</p>
      <div> {props.applicationText.text}</div>
    </div>
  );
};
