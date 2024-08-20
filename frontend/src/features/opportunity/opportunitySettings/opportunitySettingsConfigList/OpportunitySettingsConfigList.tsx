import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { OpportunitySettingsConfigItem } from "../opportunitySettingsConfigItem/OpportunitySettingsConfigItem";
import styles from "./OpportunitySettingsConfigList.module.scss";

export const OpportunitySettingsConfigList: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.settingsList}>
      <OpportunitySettingsConfigItem
        property="openLinkInline"
        title={t(texts.opportunitySettings.generalSettings.openLinkInline)}
      />
    </div>
  );
};
