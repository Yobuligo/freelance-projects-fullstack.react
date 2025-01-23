import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { ActionButton } from "../../components/buttons/actionButton/ActionButton";
import { IconType } from "../../components/buttons/iconButton/IconType";
import { ApplicationOrigin } from "../applicationOriginConfig/types/ApplicationOrigin";
import { IMailSubjectProps } from "./IMailSubjectProps";

export const MailSubject: React.FC<IMailSubjectProps> = (props) => {
  const { t } = useTranslation();

  const subject = (): string => {
    const projectInfo = `"${props.applicationOrigin.projectTitle}" ${
      props.applicationOrigin.projectId &&
      props.applicationOrigin.applicationOrigin ===
        ApplicationOrigin.FREELANCERMAP
        ? `(${t(texts.applyMessageGenerator.projectId)}: ${
            props.applicationOrigin.projectId
          })`
        : ""
    }`;
    return t(texts.applyMessageGenerator.messageSection.subject, {
      website: props.applicationOrigin.applicationOrigin ?? "",
      projectInfo: projectInfo,
    });
  };

  const copyToClipboard = async () => {
    navigator.clipboard.writeText(subject());
  };

  return (
    <>
      <p>{subject()}</p>
      <ActionButton iconType={IconType.COPY} onClick={copyToClipboard} />
    </>
  );
};
