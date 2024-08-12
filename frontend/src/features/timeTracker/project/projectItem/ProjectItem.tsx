import { Button } from "../../../../components/button/Button";
import { Card } from "../../../../components/card/Card";
import { DurationDisplay } from "../../../../components/duration/DurationDisplay";
import { Toolbar } from "../../../../components/toolbar/Toolbar";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { CheckIcon } from "../../../../icons/CheckIcon";
import { CloseIcon } from "../../../../icons/CloseIcon";
import { DeleteIcon } from "../../../../icons/DeleteIcon";
import { EditIcon } from "../../../../icons/EditIcon";
import { StartIcon } from "../../../../icons/StartIcon";
import componentStyle from "../../../../styles/components.module.scss";
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
          <div className={styles.headerTitleContainer} onClick={viewModel.onClick}>
            {viewModel.isRunning && <StartIcon />}
            <input
              className={style(
                styles.input,
                viewModel.displayMode ? styles.inputDisabled : ""
              )}
              disabled={false}
              onChange={viewModel.onChangeProjectTitle}
              onKeyUp={viewModel.onKeyUp}
              type="text"
              value={viewModel.projectTitle}
            />
          </div>
          <div className={styles.headerButtons}>
            {viewModel.displayMode ? (
              <>
                <button className={styles.iconButton}>
                  <EditIcon
                    className={componentStyle.clickableIcon}
                    onClick={viewModel.onEditMode}
                  />
                </button>
                <button
                  className={styles.iconButton}
                  onClick={viewModel.onDelete}
                >
                  <DeleteIcon className={componentStyle.clickableIcon} />
                </button>
              </>
            ) : (
              <>
                <button className={styles.iconButton}>
                  <CheckIcon
                    className={componentStyle.clickableIcon}
                    onClick={viewModel.onConfirm}
                  />
                </button>
                <button
                  className={styles.iconButton}
                  onClick={viewModel.onCancel}
                >
                  <CloseIcon className={componentStyle.clickableIcon} />
                </button>
              </>
            )}
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
