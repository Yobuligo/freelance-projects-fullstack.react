import { ReactNode } from "react";

export interface IToolbarProps {
  /**
   * Defines the toolbar elements at the left side.
   * This is the default. Elements which are added as child elements are displayed left.
   */
  leftChildren?: ReactNode;

  /**
   * Defines the toolbar elements at the right side.
   */
  rightChildren?: ReactNode;
}
