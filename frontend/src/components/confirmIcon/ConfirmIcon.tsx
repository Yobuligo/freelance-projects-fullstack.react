import { CheckIcon } from "../../icons/CheckIcon";
import { IConfirmIconProps } from "./IConfirmIconProps";
import styles from "./ConfirmIcon.module.scss";

export const ConfirmIcon: React.FC<IConfirmIconProps> = (props) => {
  return (
    <div className={styles.confirmIcon}>
      <CheckIcon />
      {props.text}
    </div>
  );
};
