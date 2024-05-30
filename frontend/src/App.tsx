import { useState } from "react";
import styles from "./App.module.scss";
import { AppContext } from "./context/AppContext";
import { ProjectSection } from "./features/projectSection/ProjectSection";
import { useUserConfig } from "./hooks/useUserConfig";

export const App: React.FC = () => {
  useState();
  return (
    <AppContext.Provider value={{ userConfig: useUserConfig() }}>
      <div className={styles.app}>
        <ProjectSection />
      </div>
    </AppContext.Provider>
  );
};
