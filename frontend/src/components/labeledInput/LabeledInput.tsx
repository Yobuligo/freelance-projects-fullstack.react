import { useId } from "react";
import { ILabeledInputProps } from "./ILabeledInputProps";
import styles from "./LabeledInput.module.scss";

export const LabeledInput: React.FC<ILabeledInputProps> = (props) => {
  const id = useId();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    props.onChange?.(event.target.value);

  return (
    <div className={styles.labeledInput}>
      <label htmlFor={id}>{props.label}</label>
      <input
        className={props.classNameInput}
        id={id}
        onChange={onChange}
        type="text"
        value={props.initialValue}
      />
    </div>
  );
};
