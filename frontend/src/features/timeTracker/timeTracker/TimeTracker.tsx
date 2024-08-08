import { ProjectSection } from "../project/projectSection/ProjectSection";
import { ITimeTrackerProps } from "./ITimeTrackerProps";
import styles from "./TimeTracker.module.scss";

export const TimeTracker: React.FC<ITimeTrackerProps> = (props) => {
  return (
    <div className={styles.timeTracker}>
      <ProjectSection />
    </div>
  );
};
