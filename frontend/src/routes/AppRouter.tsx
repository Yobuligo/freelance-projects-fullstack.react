import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { ProjectPage } from "../pages/ProjectPage";
import { AppRoutes } from "./AppRoutes";

export const AppRouter = createBrowserRouter([
  { path: AppRoutes.projects.origin, element: <ProjectPage /> },
  { path: AppRoutes.login.origin, element: <LoginPage /> },
]);
