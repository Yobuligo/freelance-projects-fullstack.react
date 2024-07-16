import { ErrorDisplay } from "../components/errorDisplay/ErrorDisplay";
import { PublicPage } from "../components/pages/publicPage/PublicPage";
import { ProjectSection } from "../features/project/projectSection/ProjectSection";
import { ProviderDetailsContextProvider } from "../features/providerDetailsContextProvider/ProviderDetailsContextProvider";

export const ProjectPage: React.FC = () => {
  return (
    <PublicPage>
      <ProviderDetailsContextProvider>
        <ErrorDisplay />
        <ProjectSection />
      </ProviderDetailsContextProvider>
    </PublicPage>
  );
};
