import { ReactComponent as SVG } from "../assets/upload.svg";
import { IIconProps } from "./core/IIconProps";
import { Icon } from "./core/Icon";

export const UploadIcon: React.FC<IIconProps> = (props) => {
  return <Icon SVG={SVG} {...props} />;
};
