import { ReactComponent as SVG } from "../assets/start.svg";
import { IIconProps } from "./core/IIconProps";
import { Icon } from "./core/Icon";

export const StartIcon: React.FC<IIconProps> = (props) => {
  return <Icon SVG={SVG} {...props} />;
};
