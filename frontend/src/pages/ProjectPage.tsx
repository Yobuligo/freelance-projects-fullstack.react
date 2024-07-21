import { ErrorDisplay } from "../components/errorDisplay/ErrorDisplay";
import { ProtectedPage } from "../components/pages/protectedPage/ProtectedPage";
import { ProjectSection } from "../features/project/projectSection/ProjectSection";
import { ProviderDetailsContextProvider } from "../features/providerDetailsContextProvider/ProviderDetailsContextProvider";

export const ProjectPage: React.FC = () => {
  return (
    <ProtectedPage>
      <ProviderDetailsContextProvider>
        <ErrorDisplay />
        <ProjectSection />
      </ProviderDetailsContextProvider>
    </ProtectedPage>
  );
};
