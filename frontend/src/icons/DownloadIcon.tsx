import { ReactComponent as SVG } from "../assets/download.svg";
import { IIconProps } from "./core/IIconProps";
import { Icon } from "./core/Icon";

export const DownloadIcon: React.FC<IIconProps> = (props) => {
  return <Icon SVG={SVG} {...props} />;
};
