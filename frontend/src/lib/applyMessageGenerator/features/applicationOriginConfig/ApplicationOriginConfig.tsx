import { useState } from "react";
import { ConfigureComponent } from "../configureComponent/ConfigureComponent";
import styles from "./ApplicationOriginConfig.module.scss";
import { IApplicationOriginConfigProps } from "./IApplicationOriginConfigProps";
import { ApplicationOrigin } from "./types/ApplicationOrigin";
import { IApplicationOrigin } from "./types/IApplicationOrigin";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { EnumMultiSelectButtons } from "../../components/buttons/multiSelectButtons/enumMultiSelectButtons/EnumMultiSelectButtons";
import { InputField } from "../../components/inputField/InputField";

export const ApplicationOriginConfig: React.FC<
  IApplicationOriginConfigProps
> = (props) => {
  const { t } = useTranslation();
  const [applicationOrigin, setApplicationOrigin] = useState<
    IApplicationOrigin | undefined
  >(undefined);

  const isProjectIdFieldDisabled =
    applicationOrigin?.applicationOrigin !== ApplicationOrigin.FREELANCERMAP;

  const onApplicationOriginChange = (applicationOrigin: ApplicationOrigin) => {
    setApplicationOrigin((previous) => {
      const newApplicationOrigin = { ...previous, applicationOrigin };
      props.onChange(newApplicationOrigin);
      return newApplicationOrigin;
    });
  };

  const onLinkChange = (link: string) => {
    setApplicationOrigin((previous) => {
      const newApplicationOrigin = { ...previous, link };
      props.onChange(newApplicationOrigin);
      return newApplicationOrigin;
    });
  };

  const onProjectIdChange = (projectId: string) => {
    setApplicationOrigin((previous) => {
      const newApplicationOrigin = { ...previous, projectId };
      props.onChange(newApplicationOrigin);
      return newApplicationOrigin;
    });
  };

  const onProjectTitleChange = (projectTitle: string) => {
    setApplicationOrigin((previous) => {
      const newApplicationOrigin = { ...previous, projectTitle };
      props.onChange(newApplicationOrigin);
      return newApplicationOrigin;
    });
  };

  return (
    <ConfigureComponent
      title={t(texts.applyMessageGenerator.applicationOrigin.title)}
    >
      <div className={styles.applicationOriginConfig}>
        <EnumMultiSelectButtons
          enumType={ApplicationOrigin}
          onChange={onApplicationOriginChange}
        />
        <InputField
          label={t(texts.applyMessageGenerator.applicationOrigin.projectTitle)}
          onChange={onProjectTitleChange}
        />
        {applicationOrigin && (
          <InputField
            label={t(
              texts.applyMessageGenerator.applicationOrigin.linkToProject
            )}
            onChange={onLinkChange}
          />
        )}
        {applicationOrigin?.applicationOrigin ===
          ApplicationOrigin.FREELANCERMAP && (
          <InputField
            label={t(texts.applyMessageGenerator.applicationOrigin.projectId)}
            onChange={onProjectIdChange}
            disabled={isProjectIdFieldDisabled}
          />
        )}
      </div>
    </ConfigureComponent>
  );
};
