import { useId } from "react";
import { EditableInput } from "../../../../components/editableInput/EditableInput";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { DeleteIcon } from "../../../../icons/DeleteIcon";
import { Settings } from "../../../settings/settings/Settings";
import { SettingsSection } from "../../../settings/settingsSection/SettingsSection";
import { IProjectSettingsProps } from "./IProjectSettingsProps";
import styles from "./ProjectSettings.module.scss";
import { useProjectSettingsViewModel } from "./useProjectSettingsViewModel";
import { Button } from "../../../../components/button/Button";
import { style } from "../../../../core/ui/style";

export const ProjectSettings: React.FC<IProjectSettingsProps> = (props) => {
  const { t } = useTranslation();
  const viewModel = useProjectSettingsViewModel(props);
  const id = useId();

  return (
    <Settings>
      <div className={styles.settingsContent}>
        <SettingsSection
          title={t(texts.projectSettings.details)}
          classNameTitle={styles.settingsTitle}
        >
          <EditableInput
            classNameLabel={styles.settingsSectionFirstElement}
            label={t(texts.general.name)}
            value={viewModel.projectTitle}
            onChange={viewModel.onChangeProjectTitle}
          />
          <EditableInput
            classNameLabel={styles.settingsSectionFirstElement}
            label={t(texts.general.description)}
            value={viewModel.projectDescription}
            onChange={viewModel.onChangeProjectDescription}
          />
        </SettingsSection>
        <SettingsSection
          title={t(texts.general.generalSettings)}
          classNameTitle={styles.settingsTitle}
        >
          <EditableInput
            classNameLabel={styles.settingsSectionFirstElement}
            label={t(texts.projectSettings.prefillValue)}
            value={viewModel.taskPrefillValue}
            onChange={viewModel.onChangeDefaultTaskTitle}
          />
        </SettingsSection>
        <SettingsSection
          title={t(texts.projectSettings.dangerZone)}
          classNameTitle={style(styles.settingsTitle, styles.dangerZoneTitle)}
        >
          <Button
            className={styles.deleteButton}
            isOutlined
            onClick={viewModel.onDeleteProject}
          >
            <DeleteIcon id={id} onClick={viewModel.onDeleteProject} />
            <label htmlFor={id}>{t(texts.projectSettings.deleteProject)}</label>
          </Button>
        </SettingsSection>
      </div>
    </Settings>
  );
};
