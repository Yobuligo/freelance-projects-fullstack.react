import { ITextAreaProps } from "./ITextAreaProps";
import styles from "./TextArea.module.scss";

export const TextArea: React.FC<ITextAreaProps> = (props) => {
  return (
    <div className={styles.textArea}>
      {props.label && <span>{props.label}</span>}
      <textarea
        className={styles.note}
        value={props.value}
        rows={props.rows ?? 4}
        onChange={props.onChange}
      />
    </div>
  );
};
