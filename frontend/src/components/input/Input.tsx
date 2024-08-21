import { style } from "../../utils/style";
import { IInputProps } from "./IInputProps";
import styles from "./Input.module.scss";

export const Input: React.FC<IInputProps> = (props) => {
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.onEnter?.();
    }

    if (event.key === "Escape") {
      props.onEscape?.();
    }
  };

  const { onEnter, onEscape, ...inputProps } = props;

  return (
    <input
      {...inputProps}
      onKeyDown={onKeyDown}
      className={style(props.className, props.disabled ? styles.disabled : "")}
    />
  );
};
