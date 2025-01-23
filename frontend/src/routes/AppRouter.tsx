import { createBrowserRouter } from "react-router-dom";
import { MessageGeneratorPage } from "../pages/ApplyMessageGeneratorPage";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { OpportunityPage } from "../pages/OpportunityPage";
import { TimerTrackerPage } from "../pages/TimerTrackerPage";
import { AppRoutes } from "./AppRoutes";

export const AppRouter = createBrowserRouter([
  {
    path: AppRoutes.applyMessageGenerator.origin,
    element: <MessageGeneratorPage />,
  },
  { path: AppRoutes.dashboard.origin, element: <DashboardPage /> },
  { path: AppRoutes.login.origin, element: <LoginPage /> },
  { path: AppRoutes.timeTracker.origin, element: <TimerTrackerPage /> },
  { path: AppRoutes.opportunities.origin, element: <OpportunityPage /> },
]);
