import { ProtectedPage } from "../components/pages/protectedPage/ProtectedPage";
import { Dashboard } from "../features/dashboard/dashboard/Dashboard";

export const DashboardPage: React.FC = () => {
  return (
    <ProtectedPage displayBackToStart={false}>
      <Dashboard />
    </ProtectedPage>
  );
};
