import { ReactNode } from "react";

export interface IButtonProps {
  caption?: string;
  children?: ReactNode;
  onClick?: () => void;
}
