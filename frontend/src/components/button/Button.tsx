import { Card } from "../card/Card";
import styles from "./Button.module.scss";
import { IButtonProps } from "./IButtonProps";

export const Button: React.FC<IButtonProps> = (props) => {
  return (
    <Card className={styles.button} onClick={props.onClick}>
      {props.caption}
    </Card>
  );
};
