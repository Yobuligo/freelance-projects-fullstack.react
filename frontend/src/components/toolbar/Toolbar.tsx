import { IToolbarProps } from "./IToolbarProps";
import styles from "./Toolbar.module.scss";

export const Toolbar: React.FC<IToolbarProps> = (props) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.leftChildren}>{props.children}</div>
      <div>{props.rightChildren}</div>
    </div>
  );
};
