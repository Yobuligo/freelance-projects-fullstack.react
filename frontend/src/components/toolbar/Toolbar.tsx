import { isInitial } from "../../core/utils/isInitial";
import { style } from "../../utils/style";
import { IToolbarProps } from "./IToolbarProps";
import styles from "./Toolbar.module.scss";

export const Toolbar: React.FC<IToolbarProps> = (props) => {
  return (
    <div className={style(styles.toolbar, props.className)}>
      <div className={style(styles.leftChildren, isInitial(props.rightChildren) ? styles.leftIfRightEmpty : "")}>{props.children}</div>
      {props.rightChildren && <div>{props.rightChildren}</div>}
    </div>
  );
};
