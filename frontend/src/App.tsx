import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { useProjectsStorage } from "./hooks/useProjectsStorage";
import { useSessionStorage } from "./hooks/useSessionStorage";
import { useSettingsStorage } from "./hooks/useSettingsStorage";
import { useUserConfigStorage } from "./hooks/useUserConfigStorage";
import "./index.scss";
import { AppRouter } from "./routes/AppRouter";
import { ReactComponent as BackgroundShapes } from "./assets/backgroundShapes.svg";

export const App: React.FC = () => {
  return (
    <>
      <div className="backgroundShapes">
        <BackgroundShapes />
      </div>
      <AppContext.Provider
        value={{
          errorMessage: useState(""),
          projects: useProjectsStorage(),
          session: useSessionStorage(),
          settings: useSettingsStorage(),
          userConfig: useUserConfigStorage(),
        }}
      >
        <RouterProvider router={AppRouter} />
      </AppContext.Provider>
    </>
  );
};
