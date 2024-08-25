import { ILabeledElementProps } from "./ILabeledElementProps";
import styles from "./LabeledElement.module.scss";

export const LabeledElement: React.FC<ILabeledElementProps> = (props) => {
  return (
    <div className={styles.labeledElement}>
      <label htmlFor={props.elementId} className={props.classNameLabel}>
        {props.label}
      </label>
      {props.children}
    </div>
  );
};
