import { useState } from "react";
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
  const [collapsed, setCollapsed] = useState(userConfig.collapseCompleted);
  const { t } = useTranslation();

  return (
    <>
      <Card className={styles.collapseIcon}>
        <Collapse
          collapsed={collapsed}
          setCollapsed={setCollapsed}
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
      {!collapsed && (
        <ProjectList
          selectedProject={props.selectedProject}
          onSelectProject={props.onSelectProject}
          onChecked={props.onChecked}
          onUnchecked={props.onUnchecked}
          projects={props.projects}
        />
      )}
    </>
  );
};
