import { useNavigate } from "react-router-dom";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { AppRoutes } from "../../../routes/AppRoutes";
import { DashboardItem } from "../dashboardItem/DashboardItem";
import styles from "./Dashboard.module.scss";
import { IDashboardProps } from "./IDashboardProps";

export const Dashboard: React.FC<IDashboardProps> = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.dashboard}>
      <DashboardItem
        onClick={() => navigate(AppRoutes.timeTracker.toPath())}
        title={t(texts.dashboard.trackTimes)}
      />
      <DashboardItem
        onClick={() => navigate(AppRoutes.opportunities.toPath())}
        title={t(texts.dashboard.findOpportunities)}
      />
      <DashboardItem
        onClick={() => navigate(AppRoutes.applyMessageGenerator.toPath())}
        title={t(texts.dashboard.generateApplyMessage)}
      />
    </div>
  );
};
