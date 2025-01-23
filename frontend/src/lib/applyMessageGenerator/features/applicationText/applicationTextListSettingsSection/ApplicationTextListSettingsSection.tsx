import { IApplicationText } from "../../../types/IApplicationText";
import styles from "./ApplicationTextListSettingsSection.module.scss";
import { AddApplicationText } from "../addApplicationText/AddApplicationText";
import { ApplicationText } from "../applicationText/ApplicationText";
import { ConfigureComponent } from "../../configureComponent/ConfigureComponent";
import { useTranslation } from "../../../../../hooks/useTranslation/useTranslation";
import { texts } from "../../../../../hooks/useTranslation/texts";
import { IconButton } from "../../../components/buttons/iconButton/IconButton";
import { IconType } from "../../../components/buttons/iconButton/IconType";
import { Divider } from "../../../components/divider/Divider";
import { useSettings } from "../../../hooks/useSettings";

export const ApplicationTextListSettingsSection: React.FC = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useSettings();

  const removeApplicationText = (applicationText: IApplicationText) => {
    setSettings((previous) => {
      const index = previous.applicationTexts.findIndex(
        (item) => item === applicationText
      );
      index !== undefined && previous.applicationTexts.splice(index, 1);
      return {
        ...previous,
        applicationTexts: previous.applicationTexts,
      };
    });
  };

  const applicationTexts = settings.applicationTexts.map(
    (applicationText, index) => (
      <div key={`${applicationText.type}_${index}`}>
        <div className={styles.applicationTextEntry}>
          <ApplicationText applicationText={applicationText} />
          <div className={styles.buttons}>
            <IconButton
              iconType={IconType.COPY}
              onClick={async () => {
                navigator.clipboard.writeText(applicationText.text);
              }}
            />
            <IconButton
              iconType={IconType.DELETE}
              onClick={() => {
                removeApplicationText(applicationText);
              }}
            />
          </div>
        </div>
        {index < settings.applicationTexts.length - 1 && <Divider />}
      </div>
    )
  );

  return (
    <div className={styles.applicationTextListSettingsSection}>
      <ConfigureComponent
        title={t(texts.applyMessageGenerator.settings.newApplicationTextLabel)}
      >
        <AddApplicationText
          onNewApplicationText={(
            newApplicationText,
            newApplicationTextTitle
          ) => {
            setSettings((previous) => {
              previous.applicationTexts.push({
                text: newApplicationText,
                type: newApplicationTextTitle,
              });
              return {
                ...previous,
                applicationTexts: previous.applicationTexts,
              };
            });
          }}
        />
      </ConfigureComponent>
      <ConfigureComponent
        title={t(
          texts.applyMessageGenerator.applicationTexts.applicationTextsLabel
        )}
      >
        {applicationTexts}
      </ConfigureComponent>
    </div>
  );
};
