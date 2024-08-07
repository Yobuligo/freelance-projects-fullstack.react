import { style } from "../../utils/style";
import { IToolbarProps } from "./IToolbarProps";
import styles from "./Toolbar.module.scss";

export const Toolbar: React.FC<IToolbarProps> = (props) => {
  return (
    <div className={style(styles.toolbar, props.className)}>
      <div className={styles.leftChildren}>{props.children}</div>
      <div>{props.rightChildren}</div>
    </div>
  );
};
