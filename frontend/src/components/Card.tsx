import { style } from "../utils/style";
import { ICardProps } from "./ICardProps";
import styles from "./Card.module.scss";

export const Card: React.FC<ICardProps> = (props) => {
  return (
    <div className={style(props.className, styles.card)}>{props.children}</div>
  );
};
