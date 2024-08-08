import { ProtectedPage } from "../components/pages/protectedPage/ProtectedPage";
import { TimeTracker } from "../features/timeTracker/timeTracker/TimeTracker";

export const TimerTrackerPage: React.FC = () => {
  return (
    <ProtectedPage>
      <TimeTracker />
    </ProtectedPage>
  );
};
