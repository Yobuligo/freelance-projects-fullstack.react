import { Card } from "../../components/card/Card";
import { Collapse } from "../../components/collapse/Collapse";
import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { useUserConfig } from "../../hooks/useUserConfig";
import { ProjectList } from "../project/projectList/ProjectList";
import styles from "./CompleteSection.module.scss";
import { ICompletedSectionProps } from "./ICompletedSectionProps";

export const CompletedSection: React.FC<ICompletedSectionProps> = (props) => {
  const [userConfig, setUserConfig] = useUserConfig();
  const { t } = useTranslation();

  return (
    <>
      <Card className={styles.collapseIcon}>
        <Collapse
          collapsed={userConfig.collapseCompleted}
          onToggle={(collapsed) =>
            setUserConfig((userConfig) => {
              return { ...userConfig, collapseCompleted: collapsed };
            })
          }
        />
        {t(texts.completeCard.completed, {
          numberProjects: props.projects.length.toString(),
        })}
      </Card>
      {!userConfig.collapseCompleted && (
        <ProjectList
          activeProject={props.activeProject}
          onActivateProject={props.onActivateProject}
          onChecked={props.onChecked}
          onUnchecked={props.onUnchecked}
          projects={props.projects}
        />
      )}
    </>
  );
};
