import styles from "./ConfigureComponent.module.scss";
import { IConfigureComponentProps } from "./IConfigureComponentProps";

export const ConfigureComponent: React.FC<IConfigureComponentProps> = (
  props
) => {
  return (
    <>
      <h1 className={styles.configureComponentHeader}>{props.title}</h1>
      <div className={styles.configureComponentBody}>{props.children}</div>
    </>
  );
};
