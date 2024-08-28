import { style } from "../../../core/ui/style";
import { ISettingsSectionProps } from "./ISettingsSectionProps";
import styles from "./SettingsSection.module.scss";

export const SettingsSection: React.FC<ISettingsSectionProps> = (props) => {
  return (
    <>
      <h2 className={style(styles.title, props.classNameTitle)}>
        {props.title}
      </h2>
      {props.children}
      {/* <div className={styles.children}>{props.children}</div> */}
    </>
  );
};
