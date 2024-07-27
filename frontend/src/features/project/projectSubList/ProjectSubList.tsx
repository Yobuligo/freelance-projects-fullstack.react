import { Card } from "../../../components/card/Card";
import { Collapse } from "../../../components/collapse/Collapse";
import { style } from "../../../utils/style";
import { ProjectList } from "../projectList/ProjectList";
import { IProjectSubListProps } from "./IProjectSubListProps";
import styles from "./ProjectSubList.module.scss";

export const ProjectSubList: React.FC<IProjectSubListProps> = (props) => {
  console.log(`ProjectSubList: ${props.listAndItemColorClassName}`);
  return (
    <>
      <Card
        className={style(styles.collapseIcon, props.listAndItemColorClassName)}
      >
        <Collapse
          collapsed={props.collapsed}
          setCollapsed={props.setCollapsed}
        />
        {props.title}
      </Card>
      {!props.collapsed && (
        <ProjectList
          selectedUserProject={props.selectedUserProject}
          onChange={props.onChange}
          onSelectUserProject={props.onSelectUserProject}
          onChecked={props.onChecked}
          onUnchecked={props.onUnchecked}
          userProjects={props.userProjects}
          listAndItemColorClassName={props.listAndItemColorClassName}
        />
      )}
    </>
  );
};
