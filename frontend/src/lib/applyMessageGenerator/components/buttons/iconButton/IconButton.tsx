import { ReactElement } from "react";
import { Button } from "../button/Button";
import { IIconButtonProps } from "./IIconButtonProps";
import { IconTypeToComponentMapper } from "./IconTypeToComponentMapper";
import styles from "./IconButton.module.scss";
import { style } from "../../../../../core/ui/style";

export const IconButton: React.FC<IIconButtonProps> = (props) => {
  const { iconType, className, caption, ...buttonProps } = props;
  const icon = IconTypeToComponentMapper(iconType);
  const iconButtonCaption: ReactElement = (
    <div className={style(styles.iconCaption, className)}>
      {icon}
      {caption}
    </div>
  );
  return (
    <Button
      caption={iconButtonCaption}
      {...buttonProps}
      className={className}
    />
  );
};
