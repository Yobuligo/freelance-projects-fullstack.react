import { ReactElement } from "react";

export interface IButtonProps {
  caption?: string | ReactElement;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
  disabled?: boolean;
}
