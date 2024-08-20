import { Button } from "../../../../components/button/Button";
import { Card } from "../../../../components/card/Card";
import { CrudButtonPanel } from "../../../../components/crudButtonPanel/CrudButtonPanel";
import { DurationDisplay } from "../../../../components/duration/DurationDisplay";
import { Input } from "../../../../components/input/Input";
import { Toolbar } from "../../../../components/toolbar/Toolbar";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { style } from "../../../../utils/style";
import { IProjectItemProps } from "./IProjectItemProps";
import styles from "./ProjectItem.module.scss";
import { useProjectItemViewModel } from "./useProjectItemViewModel";

export const ProjectItem: React.FC<IProjectItemProps> = (props) => {
  const viewModel = useProjectItemViewModel(props);
  const { t } = useTranslation();

  return (
    <Card className={styles.projectItem}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div
            className={styles.headerTitleContainer}
            onClick={viewModel.onClick}
          >
            <div>
              <Input
                className={style(
                  styles.input,
                  viewModel.displayMode ? styles.inputDisabled : ""
                )}
                disabled={false}
                onChange={viewModel.onChangeProjectTitle}
                onEnter={viewModel.onConfirm}
                onEscape={viewModel.onCancel}
                type="text"
                value={viewModel.projectTitle}
              />
              <span className={styles.projectDescription}>
                {viewModel.projectDescription}
              </span>
            </div>
          </div>
          <div className={styles.headerButtons}>
            <CrudButtonPanel
              displayMode={viewModel.displayMode}
              onCancel={viewModel.onCancel}
              onConfirm={viewModel.onConfirm}
              onDelete={viewModel.onDelete}
              onEditMode={viewModel.onEditMode}
            />
          </div>
        </div>

        <div className={styles.durationContainer}>
          <DurationDisplay
            classNameDuration={styles.totalDuration}
            classNameTitle={styles.totalDurationTitle}
            duration={viewModel.durationTotal}
            title={t(texts.projectItem.totalWorkedTime)}
          />
          {viewModel.isRunning && viewModel.duration && (
            <DurationDisplay
              classNameDuration={styles.currentDuration}
              classNameTitle={styles.currentDurationTitle}
              duration={viewModel.duration}
              title={t(texts.projectItem.currentWorkedTime)}
            />
          )}
        </div>
      </div>
      <Toolbar className={styles.toolbar}>
        {viewModel.isRunning ? (
          <Button className={styles.button} onClick={viewModel.onStop}>
            {t(texts.projectItem.stop)}
          </Button>
        ) : (
          <Button className={styles.button} onClick={viewModel.onStart}>
            {t(texts.projectItem.start)}
          </Button>
        )}
      </Toolbar>
    </Card>
  );
};
