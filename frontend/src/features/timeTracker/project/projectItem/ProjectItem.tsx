import { Button } from "../../../../components/button/Button";
import { Card } from "../../../../components/card/Card";
import { Toolbar } from "../../../../components/toolbar/Toolbar";
import { Duration } from "../../../../core/services/date/Duration";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { DeleteIcon } from "../../../../icons/DeleteIcon";
import { StartIcon } from "../../../../icons/StartIcon";
import { IProjectItemProps } from "./IProjectItemProps";
import styles from "./ProjectItem.module.scss";
import { useProjectItemViewModel } from "./useProjectItemViewModel";
import componentStyle from "../../../../styles/components.module.scss";

export const ProjectItem: React.FC<IProjectItemProps> = (props) => {
  const viewModel = useProjectItemViewModel(props);
  const { t } = useTranslation();

  return (
    <Card className={styles.projectItem}>
      <div className={styles.header}>
        <div className={styles.titleContainer} onClick={viewModel.onClick}>
          {viewModel.isRunning && <StartIcon />}
          <h3 className={styles.title}>{props.project.title}</h3>
        </div>
        <Button onClick={viewModel.onDelete}>
          <DeleteIcon className={componentStyle.icon} />
        </Button>
      </div>
      <Toolbar className={styles.toolbar}>
        <div>
          {viewModel.durationTotal && (
            <>{Duration.format(viewModel.durationTotal)}</>
          )}
        </div>
        {viewModel.isRunning ? (
          <Button className={styles.button} onClick={viewModel.onStop}>
            {t(texts.projectItem.stop)}
          </Button>
        ) : (
          <Button className={styles.button} onClick={viewModel.onStart}>
            {t(texts.projectItem.start)}
          </Button>
        )}
        <div>
          {viewModel.isRunning && viewModel.duration && (
            <>{Duration.format(viewModel.duration)}</>
          )}
        </div>
      </Toolbar>
    </Card>
  );
};
