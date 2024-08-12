import { ITaskSectionProps } from "./ITaskSectionProps";

export const useTaskSectionViewModel = (props: ITaskSectionProps) => {
  const onAdd = (title: string) => props.onAdd?.(title);

  return { onAdd };
};
