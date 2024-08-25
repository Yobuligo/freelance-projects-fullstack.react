import { useState } from "react";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { IProjectSettingsProps } from "./IProjectSettingsProps";

export const useProjectSettingsViewModel = (props: IProjectSettingsProps) => {
  const { t } = useTranslation();
  useState(true);

  const onDeleteProject = () => {
    if (
      window.confirm(
        t(texts.projectItem.deleteProject, { title: props.project.title })
      )
    ) {
      props.onDelete?.(props.project);
    }
  };

  return {
    onChangeProjectDescription: (description: string) => {
      props.project.description = description;
      props.onChange?.(props.project);
    },
    onChangeDefaultTaskTitle: (defaultTaskTitle: string) => {
      props.project.defaultTaskTitle = defaultTaskTitle;
      props.onChange?.(props.project);
    },
    onChangeProjectTitle: (title: string) => {
      props.project.title = title;
      props.onChange?.(props.project);
    },
    onDeleteProject,
    projectDescription: props.project.description,
    projectTitle: props.project.title,
    taskPrefillValue: props.project.defaultTaskTitle,
  };
};
