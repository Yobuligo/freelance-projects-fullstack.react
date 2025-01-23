import { style } from "../../../../core/ui/style";
import { IInputFieldProps } from "./IInputFieldProps";
import styles from "./InputField.module.scss";

export const InputField: React.FC<IInputFieldProps> = (props) => {
  return (
    <div className={styles.inputField}>
      {props.label && (
        <label
          className={style(
            styles.label,
            props.disabled ? styles.labelDisabled : ""
          )}
          htmlFor={props.label}
        >
          {props.label}
        </label>
      )}
      <input
        style={{ width: `${props.widthInRem}rem` }}
        value={props.initialValue}
        id={props.label}
        onChange={(event) => {
          props.onChange?.(event.currentTarget.value);
        }}
        disabled={props.disabled}
      />
      {props.suffixLabel && (
        <label
          className={style(
            styles.label,
            props.disabled ? styles.labelDisabled : ""
          )}
          htmlFor={props.label}
        >
          {props.suffixLabel}
        </label>
      )}
    </div>
  );
};
