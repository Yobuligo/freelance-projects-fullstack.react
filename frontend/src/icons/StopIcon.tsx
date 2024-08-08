import { ReactComponent as SVG } from "../assets/stop.svg";
import { IIconProps } from "./core/IIconProps";
import { Icon } from "./core/Icon";

export const StopIcon: React.FC<IIconProps> = (props) => {
  return <Icon SVG={SVG} {...props} />;
};
