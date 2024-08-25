import { Card } from "../../../components/card/Card";
import { Collapse } from "../../../components/collapse/Collapse";
import { style } from "../../../utils/style";
import { OpportunityList } from "../opportunityList/OpportunityList";
import { IOpportunitySubListProps } from "./IOpportunitySubListProps";
import styles from "./OpportunitySubList.module.scss";

export const OpportunitySubList: React.FC<IOpportunitySubListProps> = (
  props
) => {
  return (
    <>
      <Card
        className={style(styles.collapseIcon, props.listAndItemColorClassName)}
      >
        <Collapse
          collapsed={props.collapsed}
          setCollapsed={props.setCollapsed}
        />
        <div className={styles.title}>{props.title}</div>
      </Card>
      {!props.collapsed && (
        <OpportunityList
          selectedUserOpportunity={props.selectedUserOpportunity}
          onChange={props.onChange}
          onSelectUserOpportunity={props.onSelectUserOpportunity}
          onChecked={props.onChecked}
          onUnchecked={props.onUnchecked}
          userOpportunities={props.userOpportunities}
          listAndItemColorClassName={props.listAndItemColorClassName}
        />
      )}
    </>
  );
};
