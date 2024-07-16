import { ErrorDisplay } from "../components/errorDisplay/ErrorDisplay";
import { PublicPage } from "../components/pages/publicPage/PublicPage";
import { ProjectSection } from "../features/project/projectSection/ProjectSection";
import { ProviderDetailsContextProvider } from "../features/providerDetailsContextProvider/ProviderDetailsContextProvider";
import styles from "./ProjectPage.module.scss";

export const ProjectPage: React.FC = () => {
  return (
    <ProviderDetailsContextProvider>
      <PublicPage>
        <div className={styles.projectPage}>
          <ErrorDisplay />
          <ProjectSection />
        </div>
      </PublicPage>
    </ProviderDetailsContextProvider>
  );
};
