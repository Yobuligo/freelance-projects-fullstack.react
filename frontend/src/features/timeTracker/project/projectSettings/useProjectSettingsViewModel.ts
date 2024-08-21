import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { IProjectSettingsProps } from "./IProjectSettingsProps";

export const useProjectSettingsViewModel = (props: IProjectSettingsProps) => {
  const { t } = useTranslation();
  useState(true);
  const navigate = useNavigate();

  const onDeleteProject = () => {
    if (
      window.confirm(
        t(texts.projectItem.deleteProject, { title: props.project.title })
      )
    ) {
      props.onDelete?.(props.project);
      //fix this to only navigate to project overview
      navigate(-1);
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
