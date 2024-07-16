import { ErrorDisplay } from "../components/errorDisplay/ErrorDisplay";
import { ProtectedPage } from "../components/pages/protectedPage/ProtectedPage";
import { ProjectSection } from "../features/project/projectSection/ProjectSection";
import { ProviderDetailsContextProvider } from "../features/providerDetailsContextProvider/ProviderDetailsContextProvider";
import styles from "./ProjectPage.module.scss";

export const ProjectPage: React.FC = () => {
  return (
    <ProviderDetailsContextProvider>
      <ProtectedPage>
        <div className={styles.projectPage}>
          <ErrorDisplay />
          <ProjectSection />
        </div>
      </ProtectedPage>
    </ProviderDetailsContextProvider>
  );
};
