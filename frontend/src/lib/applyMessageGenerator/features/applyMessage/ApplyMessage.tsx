import { ReactNode } from "react";
import { copyHTMLToClipboard } from "../../utils/copyHTMLToClipboard";
import { NumberOfApplicants } from "../numberOfApplicantsConfig/types/NumberOfApplicants";
import { ApplicationMedium } from "../applicationMediumConfig/types/ApplicationMedium";
import { ApplicationOrigin } from "../applicationOriginConfig/types/ApplicationOrigin";
import { Farewell } from "../farewellConfig/Farewell";
import styles from "./ApplyMessage.module.scss";
import { IApplyMessageProps } from "./IApplyMessageProps";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { ActionButton } from "../../components/buttons/actionButton/ActionButton";
import { IconType } from "../../components/buttons/iconButton/IconType";
import { Markdown } from "../../components/markdown/Markdown";
import { settings } from "../../config";
import { NotImplementedError } from "../../../../core/errors/NotImplementedError";

export const ApplyMessage: React.FC<IApplyMessageProps> = (props) => {
  const { t } = useTranslation();

  const getApplicationMessages = () =>
    props.applyMessageConfig?.applicationTexts.map((text, index) => (
      <Markdown key={index} markdownText={text} />
    ));
  const getProjectLink = (): JSX.Element => {
    if (props.applyMessageConfig?.applicationOrigin === undefined) return <></>;
    switch (props.applyMessageConfig?.applicationOrigin.applicationOrigin) {
      case ApplicationOrigin.FREELANCE:
      case ApplicationOrigin.OTHER: {
        return (
          <a href={props.applyMessageConfig?.applicationOrigin.link}>
            {props.applyMessageConfig?.applicationOrigin.projectTitle}
          </a>
        );
      }
      case ApplicationOrigin.FREELANCERMAP: {
        return (
          <>
            {props.applyMessageConfig?.applicationOrigin.projectId && (
              <a href={props.applyMessageConfig?.applicationOrigin.link}>{`${
                props.applyMessageConfig.applicationOrigin.projectTitle
              } (${t(texts.applyMessageGenerator.projectId)} ${
                props.applyMessageConfig?.applicationOrigin.projectId
              })`}</a>
            )}
          </>
        );
      }
      default:
        throw new NotImplementedError(
          `Application origin ${props.applyMessageConfig?.applicationOrigin.applicationOrigin} not handled.`
        );
    }
  };

  const getGetInContactMessage = (): string => {
    if (props.applyMessageConfig?.applicationMedium === undefined) return "";
    let wouldPlaceholder;
    switch (props.applyMessageConfig.applicantNumber) {
      case NumberOfApplicants.SINGLE:
        wouldPlaceholder = t(texts.applyMessageGenerator.messageSection.wouldI);
        break;
      case NumberOfApplicants.DOUBLE:
        wouldPlaceholder = t(
          texts.applyMessageGenerator.messageSection.wouldWe
        );
        break;
      default:
        throw new NotImplementedError(
          `ApplicantNumber enum value '${props.applyMessageConfig.applicantNumber}' not handled.`
        );
    }

    switch (props.applyMessageConfig?.applicationMedium) {
      case ApplicationMedium.WEBSITE: {
        return t(
          texts.applyMessageGenerator.messageSection
            .getInContactWithoutPlatformInfoWithoutLink,
          { wouldWho: wouldPlaceholder }
        );
      }
      case ApplicationMedium.EMAIL: {
        if (props.applyMessageConfig?.applicationOrigin === undefined)
          return "";
        switch (props.applyMessageConfig?.applicationOrigin.applicationOrigin) {
          case ApplicationOrigin.FREELANCE:
          case ApplicationOrigin.FREELANCERMAP: {
            return t(
              texts.applyMessageGenerator.messageSection
                .getInContactWithPlatformInfo,
              {
                wouldWho: wouldPlaceholder,
                projectInfo:
                  props.applyMessageConfig?.applicationOrigin
                    ?.applicationOrigin ?? "",
              }
            );
          }
          case ApplicationOrigin.OTHER: {
            return t(
              texts.applyMessageGenerator.messageSection
                .getInContactWithoutPlatformInfoWithLink,
              { wouldWho: wouldPlaceholder }
            );
          }
          default:
            throw new NotImplementedError(
              `Application origin ${props.applyMessageConfig?.applicationOrigin.applicationOrigin} not handled.`
            );
        }
      }
      default:
        throw new NotImplementedError(
          `Case for ApplicationMedium ${props.applyMessageConfig?.applicationMedium} not handled.`
        );
    }
  };

  const getSecondProfileLink = (): ReactNode | string => {
    if (
      props.applyMessageConfig?.applicantNumber === NumberOfApplicants.DOUBLE
    ) {
      let codingBuddyLink = "";
      switch (props.applyMessageConfig.applicationOrigin?.applicationOrigin) {
        case ApplicationOrigin.FREELANCERMAP:
          codingBuddyLink = settings.codingBuddyLinkFreelancerMap;
          break;
        case ApplicationOrigin.FREELANCE:
          codingBuddyLink = settings.codingBuddyLinkFreelance;
          break;
        default:
          codingBuddyLink = settings.codingBuddyLinkLinkedIn;
      }
      return (
        <>
          {t(
            texts.applyMessageGenerator.messageSection.codingBuddyProfileInfo,
            {
              profileLink: <a href={codingBuddyLink}>{codingBuddyLink}</a>,
            }
          )}
          <br />
        </>
      );
    }
    return "";
  };

  const getConditions = (): string => {
    let conditions: string = "";

    if (props.applyMessageConfig?.availableFrom) {
      conditions = t(
        texts.applyMessageGenerator.messageSection.availabilityInfo,
        {
          availableFrom: props.applyMessageConfig.availableFrom,
        }
      );
    }

    if (props.applyMessageConfig?.hourlyRate) {
      conditions =
        conditions +
        t(texts.applyMessageGenerator.messageSection.hourlyRateInfo, {
          hourlyRate: props.applyMessageConfig.hourlyRate,
        });
    }
    return conditions;
  };

  const getFarewell = (): string => {
    if (props.applyMessageConfig?.farewell.farewell === undefined) return "";
    switch (props.applyMessageConfig?.farewell.farewell) {
      case Farewell.POLITE: {
        return t(texts.applyMessageGenerator.messageSection.bestRegardsPolite);
      }
      case Farewell.INFORMAL: {
        return t(
          texts.applyMessageGenerator.messageSection.bestRegardsInformal
        );
      }
      default:
        throw new NotImplementedError(
          `Case for ApplicationMedium ${props.applyMessageConfig?.applicationMedium} not handled.`
        );
    }
  };

  const getTelephoneNumber = (): string =>
    `${t(texts.applyMessageGenerator.messageSection.telephoneNumber)} ${
      props.applyMessageConfig?.telephoneNumber
    }.`;

  const copyToClipboard = async () => {
    copyHTMLToClipboard(
      document.getElementById("messageContent")?.innerHTML ?? ""
    );
  };

  return (
    <>
      <div id="messageContent">
        <p>{props.applyMessageConfig?.salutation}</p>
        {getApplicationMessages()}
        {getSecondProfileLink()}
        <div>{getGetInContactMessage()}</div>
        {props.applyMessageConfig?.applicationMedium ===
          ApplicationMedium.EMAIL && <div>{getProjectLink()}</div>}
        <div>{getConditions()}</div>
        <br />
        <div>{getTelephoneNumber()}</div>
        <br />

        <div>{getFarewell()}</div>
        <div>{props.applyMessageConfig?.farewell.name ?? ""}</div>
      </div>
      <div className={styles.actionButton}>
        <ActionButton iconType={IconType.COPY} onClick={copyToClipboard} />
      </div>
    </>
  );
};
