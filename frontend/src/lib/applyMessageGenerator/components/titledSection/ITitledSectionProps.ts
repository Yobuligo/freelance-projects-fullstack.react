import { ReactElement } from "react";

export interface ITitledSectionProps{
  title: string;
  children: ReactElement | ReactElement[];
  className?: string;
}
