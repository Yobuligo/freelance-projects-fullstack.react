import { useState } from "react";
import styles from "./App.module.scss";
import { ErrorDisplay } from "./components/errorDisplay/ErrorDisplay";
import { AppContext } from "./context/AppContext";
import { ProjectSection } from "./features/project/projectSection/ProjectSection";
import { ProviderDetailsContextProvider } from "./features/providerDetailsContextProvider/ProviderDetailsContextProvider";
import { useSettingsStorage } from "./hooks/useSettingsStorage";
import { useUserConfigStorage } from "./hooks/useUserConfigStorage";
import "./index.scss";

export const App: React.FC = () => {
  return (
    <AppContext.Provider
      value={{
        errorMessage: useState(""),
        settings: useSettingsStorage(),
        userConfig: useUserConfigStorage(),
      }}
    >
      <ProviderDetailsContextProvider>
        <div className={styles.app}>
          <ErrorDisplay />
          <ProjectSection />
        </div>
      </ProviderDetailsContextProvider>
    </AppContext.Provider>
  );
};
