import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { ProviderDetailsContextProvider } from "./features/providerDetailsContextProvider/ProviderDetailsContextProvider";
import { useProjectsStorage } from "./hooks/useProjectsStorage";
import { useSettingsStorage } from "./hooks/useSettingsStorage";
import { useUserConfigStorage } from "./hooks/useUserConfigStorage";
import "./index.scss";
import { AppRouter } from "./routes/AppRouter";

export const App: React.FC = () => {
  return (
    <AppContext.Provider
      value={{
        errorMessage: useState(""),
        projects: useProjectsStorage(),
        settings: useSettingsStorage(),
        userConfig: useUserConfigStorage(),
      }}
    >
      <ProviderDetailsContextProvider>
        <RouterProvider router={AppRouter} />
      </ProviderDetailsContextProvider>
    </AppContext.Provider>
  );
};
