import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { style } from "../../../../utils/style";
import { OpportunitySettingsConfigItem } from "../opportunitySettingsConfigItem/OpportunitySettingsConfigItem";
import { IOpportunitySettingsConfigListProps } from "./IOpportunitySettingsConfigListProps";
import styles from "./OpportunitySettingsConfigList.module.scss";

export const OpportunitySettingsConfigList: React.FC<
  IOpportunitySettingsConfigListProps
> = (props) => {
  const { t } = useTranslation();

  return (
    <div className={style(styles.settingsList, props.className)}>
      <OpportunitySettingsConfigItem
        property="openLinkInline"
        title={t(texts.opportunitySettings.generalSettings.openLinkInline)}
      />
    </div>
  );
};
