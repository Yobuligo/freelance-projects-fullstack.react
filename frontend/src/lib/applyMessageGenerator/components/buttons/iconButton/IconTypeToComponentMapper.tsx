import { IconType } from "./IconType";
import { ReactComponent as Settings } from "../../../assets/settings.svg";
import { ReactComponent as Copy } from "../../../assets/copy.svg";
import { ReactComponent as Delete } from "../../../assets/delete.svg";
import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactElement } from "react";
import styles from "./SVG.module.scss";

export const IconTypeToComponentMapper = (iconType: IconType): ReactElement => {
  switch (iconType) {
    case IconType.SETTINGS:
      return <Settings className={styles.svg} />;
    case IconType.COPY:
      return <Copy className={styles.svg} />;
    case IconType.DELETE:
      return <Delete className={styles.svg} />;
    case IconType.ADD:
      return <Add className={styles.svg} />;
    default:
      throw Error(`IconType ${iconType} not implemented`);
  }
};
