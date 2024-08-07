import { ErrorDisplay } from "../components/errorDisplay/ErrorDisplay";
import { ProtectedPage } from "../components/pages/protectedPage/ProtectedPage";
import { Dashboard } from "../features/dashboard/dashboard/Dashboard";
import { ProviderDetailsContextProvider } from "../features/providerDetailsContextProvider/ProviderDetailsContextProvider";
import styles from "./DashboardPage.module.scss";

export const DashboardPage: React.FC = () => {
  return (
    <ProtectedPage>
      <ProviderDetailsContextProvider>
        <ErrorDisplay className={styles.errorDisplay} />
        <Dashboard />
      </ProviderDetailsContextProvider>
    </ProtectedPage>
  );
};
