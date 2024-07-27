import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { useSessionStorage } from "./hooks/useSessionStorage";
import { useSettingsStorage } from "./hooks/useSettingsStorage";
import { useUserConfigStorage } from "./hooks/useUserConfigStorage";
import "./index.scss";
import { AppRouter } from "./routes/AppRouter";
import { IUserProject } from "./shared/model/IUserProject";

export const App: React.FC = () => {
  return (
    <AppContext.Provider
      value={{
        errorMessage: useState(""),
        userProjects: useState<IUserProject[]>([]),
        session: useSessionStorage(),
        settings: useSettingsStorage(),
        userConfig: useUserConfigStorage(),
      }}
    >
      <RouterProvider router={AppRouter} />
    </AppContext.Provider>
  );
};
