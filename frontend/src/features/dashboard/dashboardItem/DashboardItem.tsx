import { Card } from "../../../components/card/Card";
import styles from "./DashboardItem.module.scss";
import { IDashboardItemProps } from "./IDashboardItemProps";

export const DashboardItem: React.FC<IDashboardItemProps> = (props) => {
  return (
    <Card className={styles.dashboardItem} onClick={props.onClick}>
      <h2 className={styles.title}>{props.title}</h2>
    </Card>
  );
};
