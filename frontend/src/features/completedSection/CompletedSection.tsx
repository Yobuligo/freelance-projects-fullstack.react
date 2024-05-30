import { useState } from "react";
import { ReactComponent as CollapsedIcon } from "../../assets/collapsed.svg";
import { ReactComponent as ExpandedIcon } from "../../assets/expanded.svg";
import { Card } from "../../components/card/Card";
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

  const onToggleCollapsed = () =>
    setCollapsed((previous) => {
      previous = !previous;
      setUserConfig((userConfig) => {
        userConfig.collapseCompleted = previous;
        return { ...userConfig };
      });
      return previous;
    });

  return (
    <>
      <Card className={styles.collapseIcon}>
        {collapsed ? (
          <ExpandedIcon onClick={onToggleCollapsed} />
        ) : (
          <CollapsedIcon onClick={onToggleCollapsed} />
        )}
        {t(texts.completeCard.completed, {
          numberProjects: props.projects.length.toString(),
        })}
      </Card>
      {!collapsed && (
        <ProjectList
          onChecked={props.onChecked}
          onUnchecked={props.onUnchecked}
          projects={props.projects}
        />
      )}
    </>
  );
};
