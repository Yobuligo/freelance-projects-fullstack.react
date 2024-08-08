import { ProtectedPage } from "../components/pages/protectedPage/ProtectedPage";
import { OpportunitySection } from "../features/opportunity/opportunitySection/OpportunitySection";
import { ProviderDetailsContextProvider } from "../features/providerDetailsContextProvider/ProviderDetailsContextProvider";

export const OpportunityPage: React.FC = () => {
  return (
    <ProtectedPage>
      <ProviderDetailsContextProvider>
        <OpportunitySection />
      </ProviderDetailsContextProvider>
    </ProtectedPage>
  );
};
