import styles from "./App.module.scss";
import { ProjectSection } from "./features/projectSection/ProjectSection";

export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <ProjectSection />
    </div>
  );
};
