import { ErrorDisplay } from "../components/errorDisplay/ErrorDisplay";
import { ProtectedPage } from "../components/pages/protectedPage/ProtectedPage";
import { OpportunitySection } from "../features/opportunity/opportunitySection/OpportunitySection";
import { ProviderDetailsContextProvider } from "../features/providerDetailsContextProvider/ProviderDetailsContextProvider";
import styles from "./OpportunityPage.module.scss";

export const OpportunityPage: React.FC = () => {
  return (
    <ProtectedPage>
      <ProviderDetailsContextProvider>
        <ErrorDisplay className={styles.errorDisplay} />
        <OpportunitySection />
      </ProviderDetailsContextProvider>
    </ProtectedPage>
  );
};
