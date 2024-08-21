import { ReactComponent as SVG } from "../assets/settings.svg";
import { IIconProps } from "./core/IIconProps";
import { Icon } from "./core/Icon";

export const SettingsIcon: React.FC<IIconProps> = (props) => {
  return <Icon SVG={SVG} {...props} />;
};
