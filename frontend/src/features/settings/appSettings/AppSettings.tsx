import { Switch } from "../../../components/switch/Switch";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { useUserConfig } from "../../../hooks/useUserConfig";
import styles from "./AppSettings.module.scss";

export const AppSettings: React.FC = () => {
  const { t } = useTranslation();
  const [userConfig, setUserConfig] = useUserConfig();

  const onOpenLinkInlineChecked = (checked: boolean) =>
    setUserConfig((previous) => {
      previous.openLinkInline = checked;
      return { ...previous };
    });

  return (
    <div className={styles.appSettings}>
      <div>
        {t(texts.settingsSection.appSettings.openLinkInline)}

        <Switch
          checked={userConfig.openLinkInline ?? true}
          onChange={onOpenLinkInlineChecked}
        />
      </div>
    </div>
  );
};
