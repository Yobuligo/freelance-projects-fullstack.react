import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ReactComponent as BackgroundShapes } from "./assets/backgroundShapes.svg";
import { AppContext } from "./context/AppContext";
import { useRecentlyProjectsStorage } from "./hooks/useRecentlyUsedProjectsStorage";
import { useSessionStorage } from "./hooks/useSessionStorage";
import { useTimeTrackerSettingsStorage } from "./hooks/useTimeTrackerSettingsStorage";
import { useUserConfigStorage } from "./hooks/useUserConfigStorage";
import "./index.scss";
import { AppRouter } from "./routes/AppRouter";
import { IUserOpportunity } from "./shared/model/IUserOpportunity";
import { IUserProviderRequest } from "./shared/model/IUserProviderRequest";

export const App: React.FC = () => {
  return (
    <>
      <div className="backgroundShapes">
        <BackgroundShapes />
      </div>
      <AppContext.Provider
        value={{
          errorMessage: useState(""),
          recentlyUsedProjects: useRecentlyProjectsStorage(),
          session: useSessionStorage(),
          timeTrackerSettings: useTimeTrackerSettingsStorage(),
          userConfig: useUserConfigStorage(),
          userOpportunities: useState<IUserOpportunity[]>([]),
          userProviderRequests: useState<IUserProviderRequest[]>([]),
        }}
      >
        <RouterProvider router={AppRouter} />
      </AppContext.Provider>
    </>
  );
};
