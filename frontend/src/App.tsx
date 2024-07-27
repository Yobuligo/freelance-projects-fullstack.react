import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { useSessionStorage } from "./hooks/useSessionStorage";
import { useUserConfigStorage } from "./hooks/useUserConfigStorage";
import "./index.scss";
import { AppRouter } from "./routes/AppRouter";
import { IUserProject } from "./shared/model/IUserProject";
import { IUserProviderRequest } from "./shared/model/IUserProviderRequest";

export const App: React.FC = () => {
  return (
    <AppContext.Provider
      value={{
        errorMessage: useState(""),
        userProjects: useState<IUserProject[]>([]),
        session: useSessionStorage(),
        userConfig: useUserConfigStorage(),
        userProviderRequests: useState<IUserProviderRequest[]>([]),
      }}
    >
      <RouterProvider router={AppRouter} />
    </AppContext.Provider>
  );
};
