import { Divider } from "../../components/divider/Divider";
import { InputField } from "../../components/inputField/InputField";
import { ApplicationTextListSettingsSection } from "../applicationText/applicationTextListSettingsSection/ApplicationTextListSettingsSection";
import { useSettings } from "../../hooks/useSettings";
import styles from "./Settings.module.scss";
import { TitledSection } from "../../components/titledSection/TitledSection";
import { ConfigureComponent } from "../configureComponent/ConfigureComponent";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { texts } from "../../../../hooks/useTranslation/texts";

export const Settings: React.FC = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useSettings();
  const inputFieldWidthInRem = 40;

  const updateName = (name: string) => {
    setSettings((previous) => ({ ...previous, yourName: name }));
  };

  const updateCodingBuddyLinkFreelancerMap = (link: string) => {
    setSettings((previous) => ({
      ...previous,
      codingBuddyLinkFreelancerMap: link,
    }));
  };

  const updateCodingBuddyLinkFreelance = (link: string) => {
    setSettings((previous) => ({
      ...previous,
      codingBuddyLinkFreelance: link,
    }));
  };

  const updateCodingBuddyLinkLinkedIn = (link: string) => {
    setSettings((previous) => ({ ...previous, codingBuddyLinkLinkedIn: link }));
  };

  const updateTelephoneNumber = (telephoneNumber: string) => {
    setSettings((previous) => ({ ...previous, telephoneNumber }));
  };

  return (
    <>
      <TitledSection title={t(texts.applyMessageGenerator.settings.title)}>
        <ConfigureComponent
          title={t(texts.applyMessageGenerator.settings.general)}
        >
          <div className={styles.generalSettings}>
            <InputField
              label={t(texts.applyMessageGenerator.general.nameInputFieldLabel)}
              initialValue={settings.yourName}
              onChange={updateName}
            />
            <InputField
              label={t(texts.applyMessageGenerator.general.telephoneNumber)}
              initialValue={settings.telephoneNumber}
              onChange={updateTelephoneNumber}
            />
            <InputField
              widthInRem={inputFieldWidthInRem}
              label={t(
                texts.applyMessageGenerator.settings
                  .codingBuddyLinkFreelancerMap
              )}
              initialValue={settings.codingBuddyLinkFreelancerMap}
              onChange={updateCodingBuddyLinkFreelancerMap}
            />
            <InputField
              widthInRem={inputFieldWidthInRem}
              label={t(
                texts.applyMessageGenerator.settings.codingBuddyLinkFreelance
              )}
              initialValue={settings.codingBuddyLinkFreelance}
              onChange={updateCodingBuddyLinkFreelance}
            />
            <InputField
              widthInRem={inputFieldWidthInRem}
              label={t(
                texts.applyMessageGenerator.settings.codingBuddyLinkLinkedIn
              )}
              initialValue={settings.codingBuddyLinkLinkedIn}
              onChange={updateCodingBuddyLinkLinkedIn}
            />
          </div>
        </ConfigureComponent>
        <ApplicationTextListSettingsSection />
      </TitledSection>
      <Divider />
    </>
  );
};
