import { style } from "../../../../../core/ui/style";
import styles from "./Button.module.scss";
import { IButtonProps } from "./IButtonProps";

export const Button: React.FC<IButtonProps> = (props) => {
  const { caption, isSelected, className, ...buttonProps } = props;

  return (
    <button
      className={style(
        styles.button,
        isSelected ? styles.selected : "",
        className
      )}
      {...buttonProps}
    >
      {props.caption}
    </button>
  );
};
