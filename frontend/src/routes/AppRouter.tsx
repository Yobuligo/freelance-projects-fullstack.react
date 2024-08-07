import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { OpportunityPage } from "../pages/OpportunityPage";
import { AppRoutes } from "./AppRoutes";
import { TimerTrackerPage } from "../pages/TimerTrackerPage";

export const AppRouter = createBrowserRouter([
  { path: AppRoutes.dashboard.origin, element: <DashboardPage /> },
  { path: AppRoutes.login.origin, element: <LoginPage /> },
  { path: AppRoutes.timeTracker.origin, element: <TimerTrackerPage /> },
  { path: AppRoutes.opportunities.origin, element: <OpportunityPage /> },
]);
