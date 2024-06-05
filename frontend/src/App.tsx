import { useState } from "react";
import styles from "./App.module.scss";
import { AppContext } from "./context/AppContext";
import { ProjectSection } from "./features/project/projectSection/ProjectSection";
import { ProviderDetailsContextProvider } from "./features/providerDetailsContextProvider/ProviderDetailsContextProvider";
import { useSettingsStorage } from "./hooks/useSettingsStorage";
import { useUserConfigStorage } from "./hooks/useUserConfigStorage";

export const App: React.FC = () => {
  useState();
  return (
    <AppContext.Provider
      value={{
        settings: useSettingsStorage(),
        userConfig: useUserConfigStorage(),
      }}
    >
      <ProviderDetailsContextProvider>
        <div className={styles.app}>
          <ProjectSection />
        </div>
      </ProviderDetailsContextProvider>
    </AppContext.Provider>
  );
};
