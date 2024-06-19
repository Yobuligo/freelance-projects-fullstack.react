import { CSSProperties, useEffect, useState } from "react";
import { ISwitchProps } from "./ISwitchProps";
import styles from "./Switch.module.scss";
import colors from "../../styles/core/colors.module.scss";

export const Switch: React.FC<ISwitchProps> = (props) => {
  const [isChecked, setIsChecked] = useState(props.checked ?? false);
  let style: CSSProperties = {};

  useEffect(() => {
    if (props.checked !== undefined && props.checked !== null) {
      setIsChecked(props.checked);
    }
  }, [props.checked]);

  const addCSSProperties = (cssProperties: CSSProperties) => {
    style = { ...style, ...cssProperties } as CSSProperties;
  };

  props.width &&
    addCSSProperties({ "--switchWidth": props.width } as CSSProperties);
  props.sliderColor
    ? addCSSProperties({ "--sliderColor": props.sliderColor } as CSSProperties)
    : addCSSProperties({
        "--sliderColor": colors.colorPrimaryDark,
      } as CSSProperties);
  props.colorOffState
    ? addCSSProperties({
        "--colorOffState": props.colorOffState,
      } as CSSProperties)
    : addCSSProperties({
        "--colorOffState": colors.colorDisabled,
      } as CSSProperties);
  props.colorOnState
    ? addCSSProperties({
        "--colorOnState": props.colorOnState,
      } as CSSProperties)
    : addCSSProperties({
        "--colorOnState": colors.colorPrimary,
      } as CSSProperties);

  return (
    <label style={style} className={`${props.className} ${styles.switch}`}>
      <input
        className={styles.checkbox}
        type="checkbox"
        onChange={(event) => {
          setIsChecked(event.target.checked);
          props.onChange?.(event.target.checked);
        }}
        checked={isChecked}
      />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};
