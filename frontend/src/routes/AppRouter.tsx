import { createBrowserRouter } from "react-router-dom";
import { ProjectPage } from "../pages/ProjectPage";
import { AppRoutes } from "./AppRoutes";

export const AppRouter = createBrowserRouter([
  { path: AppRoutes.projects.origin, element: <ProjectPage /> },
]);
