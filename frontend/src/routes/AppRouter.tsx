import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { OpportunityPage } from "../pages/OpportunityPage";
import { AppRoutes } from "./AppRoutes";

export const AppRouter = createBrowserRouter([
  { path: AppRoutes.opportunities.origin, element: <OpportunityPage /> },
  { path: AppRoutes.login.origin, element: <LoginPage /> },
]);
