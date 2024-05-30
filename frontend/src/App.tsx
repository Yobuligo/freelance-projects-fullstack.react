import { useState } from "react";
import styles from "./App.module.scss";
import { AppContext } from "./context/AppContext";
import { ProjectSection } from "./features/project/projectSection/ProjectSection";
import { useUserConfigStorage } from "./hooks/useUserConfigStorage";

export const App: React.FC = () => {
  useState();
  return (
    <AppContext.Provider value={{ userConfig: useUserConfigStorage() }}>
      <div className={styles.app}>
        <ProjectSection />
      </div>
    </AppContext.Provider>
  );
};
