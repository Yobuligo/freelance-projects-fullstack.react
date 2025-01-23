import { style } from "../../../../../core/ui/style";
import { Button } from "../button/Button";
import { IconButton } from "../iconButton/IconButton";
import styles from "./ActionButton.module.scss";
import { IActionButtonProps } from "./IActionButtonProps";

export const ActionButton: React.FC<IActionButtonProps> = (props) => {
  const { iconType, className, ...buttonProps } = props;
  return (
    <>
      {props.iconType !== undefined && (
        <IconButton
          iconType={iconType!}
          {...buttonProps}
          className={style(styles.actionButton, className)}
        />
      )}
      {props.iconType === undefined && (
        <Button
          className={style(styles.actionButton, className)}
          {...buttonProps}
        />
      )}
    </>
  );
};
