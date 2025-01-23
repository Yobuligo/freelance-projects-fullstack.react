import { IButtonProps } from "../button/IButtonProps";
import { IconType } from "./IconType";

export interface IIconButtonProps extends IButtonProps {
  iconType: IconType;
  iconClassName?: string;
  disabled?: boolean;
}
