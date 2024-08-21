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

export const ProjectSettings: React.FC<IProjectSettingsProps> = (props) => {
  const { t } = useTranslation();
  const viewModel = useProjectSettingsViewModel(props);
  const id = useId();

  return (
    <Settings>
      <SettingsSection title={t(texts.projectSettings.details)}>
        <div className={styles.settingsSection}>
          <EditableInput
            label={t(texts.general.name)}
            value={viewModel.projectTitle}
            onChange={viewModel.onChangeProjectTitle}
          />
          <EditableInput
            label={t(texts.general.description)}
            value={viewModel.projectDescription}
            onChange={viewModel.onChangeProjectDescription}
          />
          <label htmlFor={id}>{t(texts.projectSettings.deleteProject)}</label>
          <DeleteIcon id={id} onClick={viewModel.onDeleteProject} />
        </div>
      </SettingsSection>
      <SettingsSection title={t(texts.general.generalSettings)}>
      <div className={styles.settingsSection}>
        <EditableInput 
          label={t(texts.projectSettings.prefillValue)}
          value={viewModel.taskPrefillValue}
          onChange={viewModel.onChangeDefaultTaskTitle}
        />
      </div>
      </SettingsSection>
    </Settings>
  );
};
