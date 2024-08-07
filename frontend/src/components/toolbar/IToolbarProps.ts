import { ReactNode } from "react";

export interface IToolbarProps {
  className?: string;
  /**
   * Defines the toolbar elements at the left side. This is the default.
   */
  children?: ReactNode;

  /**
   * Defines the toolbar elements at the right side.
   */
  rightChildren?: ReactNode;
}
