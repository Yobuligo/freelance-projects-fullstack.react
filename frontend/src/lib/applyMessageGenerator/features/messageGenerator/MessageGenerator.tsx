import { useState } from "react";
import { Divider } from "../../components/divider/Divider";
import styles from "./MessageGenerator.module.scss";
import { ApplicationMedium } from "../applicationMediumConfig/types/ApplicationMedium";
import { ApplyMessage } from "../applyMessage/ApplyMessage";
import { MailSubject } from "../mailSubject/MailSubject";
import { Header } from "../header/Header";
import { MessageGeneratorConfig } from "../messageGeneratorConfig/MessageGeneratorConfig";
import { Settings } from "../settings/Settings";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { TitledSection } from "../../components/titledSection/TitledSection";
import { IApplyMessageConfig } from "../../types/IApplyMessageConfig";

export const MessageGenerator = () => {
  const { t } = useTranslation();
  const [applyMessageConfig, setApplyMessageConfig] = useState<
    IApplyMessageConfig | undefined
  >(undefined);

  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <Header
        onToggleSettings={() => setShowSettings((prev) => !prev)}
        settingsShown={showSettings}
      />
      <div className={styles.content}>
        {showSettings && <Settings />}
        <TitledSection
          title={t(texts.applyMessageGenerator.configSectionTitle)}
        >
          <MessageGeneratorConfig
            onApplyMessageConfigChange={setApplyMessageConfig}
          />
        </TitledSection>
        <Divider />
        <div className={styles.generatedMessageSection}>
          <TitledSection
            title={t(texts.applyMessageGenerator.messageSection.messageTitle)}
          >
            <ApplyMessage applyMessageConfig={applyMessageConfig} />
          </TitledSection>
          {applyMessageConfig?.applicationMedium === ApplicationMedium.EMAIL &&
            applyMessageConfig.applicationOrigin && (
              <TitledSection
                title={t(
                  texts.applyMessageGenerator.messageSection.subjectTitle
                )}
              >
                <MailSubject
                  applicationOrigin={applyMessageConfig.applicationOrigin}
                />
              </TitledSection>
            )}
        </div>
      </div>
    </>
  );
};
